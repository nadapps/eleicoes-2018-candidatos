import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

import Content from '../components/Content';
import NumeroUrna from '../components/NumeroUrna';

import { partidos } from '../services';
import styles from '../styles';

export default class Partidos extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.addListener(
        'willFocus',
        payload => {
            this.props.navigation.setParams({ title: "Partidos" });
        }
    );

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