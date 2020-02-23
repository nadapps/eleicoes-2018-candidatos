import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';

import { estados } from '../constants';
import styles from '../styles';

export default class Estados extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Escolhar o Estado da Apuração...'
  });

  constructor(props) {
    super(props);
  }

  openEstado = estado => {
    const resetAction = StackActions.push({
      index: 0,
      params: { estado, cargo: this.props.navigation.state.params.cargo },
      routeName: 'Apuracao'
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Content>
        <Card containerStyle={styles.card}>
          {estados.map((l, index) => (
            <ListItem
              component={TouchableOpacity}
              key={l.estadoabrev + ''}
              containerStyle={
                index == estados.length - 1 ? { borderBottomWidth: 0 } : {}
              }
              avatar={
                <Image
                  resizeMode="cover"
                  style={{ width: 35, height: 25 }}
                  source={{ uri: l.bandeira }}
                />
              }
              title={l.estado}
              onPress={() => this.openEstado(l)}
            />
          ))}
        </Card>
      </Content>
    );
  }
}
