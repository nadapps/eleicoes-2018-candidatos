import React from 'react';
import { getCargo } from '../constants';
import Estados from './Estados';

export default class DeputadoFederal extends React.Component {
  render() {
    return (
      <Estados
        cargo={getCargo('Deputado Federal')}
        title="Escolha o estado do Deputado..."
        navigation={this.props.navigation}
      />
    );
  }
}
