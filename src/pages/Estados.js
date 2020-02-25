import React, { useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions, useNavigation } from '@react-navigation/native';

import Content from '../components/Content';

import { estados } from '../constants';
import styles from '../styles';

const Estados = ({ title, navigation, cargo }) => {
  useEffect(() => {
    navigation
      .dangerouslyGetParent()
      .setOptions({ headerTitle: title || 'Estados' });
  }, []);

  return (
    <Content>
      <Card containerStyle={styles.card}>
        {estados.map((estado, index) => (
          <ListItem
            component={TouchableOpacity}
            key={estado.estadoabrev}
            containerStyle={
              index == estados.length - 1 ? { borderBottomWidth: 0 } : {}
            }
            leftAvatar={
              <Image
                resizeMode="cover"
                style={{ width: 35, height: 25 }}
                source={{ uri: estado.bandeira }}
              />
            }
            title={estado.estado}
            onPress={() =>
              navigation.dispatch(
                StackActions.push(cargo ? 'Estado' : 'Candidatos', {
                  estado,
                  cargo
                })
              )
            }
          />
        ))}
      </Card>
    </Content>
  );
};

export default Estados;
