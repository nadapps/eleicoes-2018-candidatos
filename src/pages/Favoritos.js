import React from 'react';
import { Text } from 'react-native';
import Conteudo from '../components/Conteudo';

export default class Favoritos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Conteudo>
        <Text>Favoritos</Text>
      </Conteudo>
    );
  }
}