import React from 'react';

import Content from '../components/Content';

import { candidatoGasto } from '../services';

export default class CandidatoFinancas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidato: {
                id: props.navigation.state.params.candidato.id,
                cargo: props.navigation.state.params.candidato.cargo,
                numero: props.navigation.state.params.candidato.numero+""
            },
            gasto: {},
            estado: props.navigation.state.params.estado,
            loading: true
        };
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