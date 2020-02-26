import React, { useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';

import Content from '../../components/Content';
import Card from '../../components/Card';

import { estados } from '../../core/constants';

const EstadosScreen = ({ title, navigation, cargo }) => {
  useEffect(() => {
    navigation
      .dangerouslyGetParent()
      .setOptions({ headerTitle: title || 'Estados' });
  }, []);

  return (
    <Content>
      <Card>
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
                StackActions.push(cargo ? 'Candidatos' : 'Estado', {
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

export default EstadosScreen;
