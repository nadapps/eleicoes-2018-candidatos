import React from 'react';
import { Text } from 'react-native';
import Content from '../components/Content';

export default class Partidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Content>
        <Text>Partidos</Text>
      </Content>
    );
  }
}