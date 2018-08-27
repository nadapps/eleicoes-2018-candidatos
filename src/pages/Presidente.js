import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';

import { candidatos } from '../services';

export default class Presidente extends React.Component {
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
        const resetAction = StackActions.push({
            index: 0,
            params: { candidato, estado:this.state.estado },
            routeName: 'CandidatoTab',
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Content loading={this.state.loading}>
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