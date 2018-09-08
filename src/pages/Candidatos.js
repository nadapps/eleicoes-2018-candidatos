import React from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';
import LoadingScroll from '../components/LoadingScroll';
import CandidatoItem from '../components/CandidatoItem';

import { candidatos } from '../services';
import styles from '../styles';

export default class Candidatos extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.estado.estadoabrev=="DF" && navigation.state.params.cargo.codigo=="7" ? "Deputado Distrital" : navigation.state.params.cargo.nome 
    });

    constructor(props) {
        super(props);

        if(props.navigation.state.params.estado.estadoabrev=="DF" && props.navigation.state.params.cargo.codigo=="7"){
            props.navigation.state.params.cargo.codigo = "8";   
        }

        this.state = {
            estado: props.navigation.state.params.estado,
            cargo: props.navigation.state.params.cargo,
            candidatos: [],
            allCandidatos: [],
            loading: true,
            search: false,
            scroll: false,
            page: 0
        };
    }

    async componentDidMount(){
        let result = await candidatos(this.state.estado.estadoabrev, this.state.cargo.codigo);
        this.setState({candidatos:result.candidatos.splice(0,15),allCandidatos:result.candidatos,loading:false, page:1});
    }

    openCandidato = candidato => {
        candidato.fotoUrl = "http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse="+candidato.id;
        candidato.ufCandidatura = this.state.estado.estadoabrev;
        
        const resetAction = StackActions.push({
            index: 0,
            params: { candidato, estado:this.state.estado },
            routeName: 'CandidatoTab',
        });
        this.props.navigation.dispatch(resetAction);
    }

    onEndScroll = () => {
        if(this.state.page!=0){
            this.setState({scroll: true});
            let candidatos = this.state.candidatos;
            candidatos = candidatos.concat(this.state.allCandidatos.splice(this.state.page*15,15));
            this.setState({candidatos,scroll:false,page:this.state.page+1})
        }
    }

    render() {
        return (
            <Content loading={this.state.loading} search={this.state.search}>
                <Card containerStyle={{padding:0, borderRadius:15}}>
                    <TitleEstado estado={this.state.estado} />
                </Card>
                <Card containerStyle={styles.card}>
                    <FlatList
                        style={{flex:1, borderRadius:15}}
                        keyExtractor={(item) => item.id.toString() }
                        data={this.state.candidatos}
                        renderItem={({item,index}) => <CandidatoItem index={index} candidato={item} last={index==this.state.candidatos.length-1} onPress={(candidato) => this.openCandidato(candidato)} />}
                        refreshing={true}
                        onEndReachedThreshold={1}
                        onEndReached={this.onEndScroll} />
                </Card>
                <LoadingScroll loading={this.state.scroll && !this.state.loading} />
            </Content>
        );
    }
}