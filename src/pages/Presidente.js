import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';

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
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidatos("BR", "1");
        this.setState({candidatos:result.candidatos,loading:false});
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

    render() {
        return (
            <Content loading={this.state.loading}>
                <Card containerStyle={styles.card}>
                    {
                        this.state.candidatos.map((l,index) => (
                        <ListItem
                            component={TouchableOpacity}
                            roundAvatar
                            avatar={{uri:("http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse="+l.id)}}
                            containerStyle={index==this.state.candidatos.length-1 ? {borderBottomWidth: 0} : {}}
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