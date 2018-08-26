import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { StackActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';

import { candidatos } from '../services';
import colors from '../colors';

export default class Candidatos extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.cargo.nome,
        headerLeft: 
            <TouchableOpacity onPress={() => {navigation.dispatch(StackActions.pop())} }>
                <MaterialCommunityIcons style={{marginLeft:20}} name="arrow-left" size={30} color={colors.white} />
            </TouchableOpacity>

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
                <TitleEstado estado={this.state.estado} />
                <List containerStyle={{marginTop: 0}}>
                    {
                        this.state.candidatos.map((l) => (
                        <ListItem
                            component={TouchableOpacity}
                            roundAvatar
                            avatar={{uri:(l.fotoUrl==null ? "https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" : l.fotoUrl)}}
                            key={l.id+""}
                            title={l.nomeUrna}
                            subtitle={l.partido.sigla+" - "+l.nomeColigacao}
                            onPress={() => this.openCandidato(l)}
                        />
                        ))
                    }
                </List>
            </Content>
        );
    }
}