import React from 'react';
import { Text } from 'react-native';
import Conteudo from '../components/Conteudo';

export default class Estados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Conteudo>
        <Text>Estados</Text>
      </Conteudo>
    );
  }
}