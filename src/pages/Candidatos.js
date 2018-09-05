import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';

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
            loading: true,
            search: false
        };
    }

    async componentDidMount(){
        let result = await candidatos(this.state.estado.estadoabrev, this.state.cargo.codigo);
        this.setState({candidatos:result.candidatos,loading:false});
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

    render() {
        return (
            <Content loading={this.state.loading} search={this.state.search}>
                <Card containerStyle={{padding:0, borderRadius:15}}>
                    <TitleEstado estado={this.state.estado} />
                </Card>
                <Card containerStyle={styles.card}>
                    {
                        this.state.candidatos.map((l, index) => (
                        <ListItem
                            //component={TouchableOpacity}
                            roundAvatar
                            avatar={{uri:"http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse="+l.id}}
                            containerStyle={[index==this.state.candidatos.length-1 ? {borderBottomWidth: 0, backgroundColor: "white", borderBottomRightRadius: 15, borderBottomLeftRadius: 15} : {backgroundColor: "white"},
                                                index==0 ? {borderTopLeftRadius: 15, borderTopRightRadius: 15} : {}]}
                            key={l.id+""}
                            title={l.nomeUrna}
                            subtitle={l.partido.sigla+" - "+l.nomeColigacao}
                            onPress={() => this.openCandidato(l)}
                        />
                        ))
                    }
                </Card>
            </Content>
        );
    }
}