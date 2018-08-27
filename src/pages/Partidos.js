import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import Content from '../components/Content';
import NumeroUrna from '../components/NumeroUrna';

import { partidos } from '../services';

export default class Partidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partidos: [],
      loading: true
    };
  }

  async componentDidMount(){
    let result = await partidos();
    this.setState({partidos:result.partidos,loading:false});
  }

  render() {
    return (
      <Content loading={this.state.loading}>
          {
            this.state.partidos.map((l) => (
                <ListItem
                    component={TouchableOpacity}
                    key={l.numero+""}
                    avatar = {<NumeroUrna numero={l.numero+""} />}
                    title={l.sigla}
                    subtitle={l.nome}
                />
            ))
          }
      </Content>
    );
  }
}