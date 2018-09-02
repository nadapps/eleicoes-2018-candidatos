import React from 'react';
import { getCargo } from '../constants';
import Estados from './Estados';

export default class DeputadoEstadual extends React.Component {
    render() {
        return (
            <Estados cargo={getCargo("Deputado Estadual")} title="Escolha o estado do Deputado..." navigation={this.props.navigation} />
        );
    }
}