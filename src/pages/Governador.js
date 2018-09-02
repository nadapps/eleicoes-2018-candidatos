import React from 'react';
import { getCargo } from '../constants';
import Estados from './Estados';

export default class Governador extends React.Component {
    render() {
        return (
            <Estados cargo={getCargo("Governador")} title="Escolha o estado do Governador..." navigation={this.props.navigation} />
        );
    }
}