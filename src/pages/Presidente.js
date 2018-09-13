import React from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';
import LoadingScroll from '../components/LoadingScroll';
import CandidatoItem from '../components/CandidatoItem';

import { candidatos } from '../services';
import styles from '../styles';

export default class Presidente extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Presidente"
    });

    constructor(props) {
        super(props);

        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({ title: "Presidente" });
            }
        );

        this.state = {
            candidatos: [],
            allCandidatos: [],
            loading: true,
            scroll: false,
            page: 0
        };
    }

    async componentDidMount(){
        let result = await candidatos("BR", "1");
        this.setState({candidatos:result.candidatos.splice(0,15),allCandidatos:result.candidatos,loading:false, page:1});
    }

    openCandidato = candidato => {
        candidato.fotoUrl = "http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse="+candidato.id;
        candidato.ufCandidatura = "BR";
        const resetAction = StackActions.push({
            index: 0,
            params: { candidato, estado:null },
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
            <Content loading={this.state.loading}>
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