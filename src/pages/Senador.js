import React from 'react';
import { getCargo } from '../constants';
import Estados from './Estados';

export default class Senador extends React.Component {
  render() {
    return (
      <Estados
        cargo={getCargo('Senador')}
        title="Escolha o estado do Senador..."
        navigation={this.props.navigation}
      />
    );
  }
}
