import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';

import { estados } from '../constants';
import styles from '../styles';

export default class Estados extends React.Component {
  constructor(props) {
    super(props);
    if (props.navigation) {
      props.navigation.addListener('willFocus', payload => {
        this.props.navigation.setParams({
          title: this.props.title != null ? this.props.title : 'Estados'
        });
      });
    }
  }

  openEstado = estado => {
    if (this.props.cargo != null) {
      const resetAction = StackActions.push({
        index: 0,
        params: { estado: estado, cargo: this.props.cargo },
        routeName: 'Candidatos'
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      const resetAction = StackActions.push({
        index: 0,
        params: { estado },
        routeName: 'Estado'
      });
      this.props.navigation.dispatch(resetAction);
    }
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
