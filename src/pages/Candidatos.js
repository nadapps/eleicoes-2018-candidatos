import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';

import { candidatos } from '../services';
import styles from '../styles';

export default class Candidatos extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.cargo.nome
    });

    constructor(props) {
        super(props);

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
                            component={TouchableOpacity}
                            roundAvatar
                            avatar={{uri:(l.cargo.codigo!=7 ? "http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse="+l.id : "https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png")}}
                            containerStyle={[index==this.state.candidatos.length-1 ? {borderBottomWidth: 0} : {},{backgroundColor:"white"}]}
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