import React from 'react';
import { ListItem } from 'react-native-elements';

import Content from '../components/Content';
import FavoritoCandidato from '../components/FavoritoCandidato';

import { candidato } from '../services';

export default class CandidatoEleicoes extends React.Component {
    constructor(props) {
        super(props);
        
        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.props.navigation.state.params.candidato.nomeUrna,
                    headerRight: <FavoritoCandidato />
                });
            }
        );

        this.state = {
            candidato: {
                id: props.navigation.state.params.candidato.id,
                eleicoesAnteriores: []
            },
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);
        this.setState({candidato:result,loading:false});
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                {
                    this.state.candidato.eleicoesAnteriores.map((l) => (
                        <ListItem
                            key={l.ordem+""}
                            title={"Cargo: "+l.cargo}
                            subtitle={"Ano: "+l.nrAno}
                            rightIcon={
                                {
                                    type:"entypo",
                                    name:l.situacaoTotalizacao!="Eleito" ? "" : "trophy"
                                }
                            }
                            hideChevron={ l.situacaoTotalizacao!="Eleito" }
                        />
                    ))
                }
            </Content>
        );
    }
}