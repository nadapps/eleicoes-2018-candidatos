import React from 'react';

import Content from '../components/Content';
import FavoritoCandidato from '../components/FavoritoCandidato';

import { candidatoGasto } from '../services';

export default class CandidatoFinancas extends React.Component {
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
    }

    async componentDidMount(){
        let result = await candidatoGasto((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.cargo.codigo,this.state.candidato.numero.substr(0, 2),this.state.candidato.numero,this.state.candidato.id);
        console.log(result);
        this.setState({gasto:result,loading:false});
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                
            </Content>
        );
    }
}