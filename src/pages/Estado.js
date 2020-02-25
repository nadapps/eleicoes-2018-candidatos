import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';

import { cargos } from '../constants';
import styles from '../styles';

const Estado = ({ navigation }) => {
  const [estado, setEstado] = useState(navigation.route.params.estado);

  useEffect(() => {
    setEstado(navigation.route.params.estado);
  }, [navigation]);

  return (
    <Content>
      <Card containerStyle={{ padding: 0, borderRadius: 15 }}>
        <TitleEstado estado={estado} />
      </Card>
      <Card containerStyle={styles.card}>
        {cargos.map((cargo, index) => (
          <ListItem
            component={TouchableOpacity}
            key={cargo.codigo + ''}
            title={
              estado.estadoabrev == 'DF' && cargo.codigo == 7
                ? 'Deputado Distrital'
                : cargo.nome
            }
            containerStyle={[
              index == cargos.length - 1 ? { borderBottomWidth: 0 } : {}
            ]}
            onPress={() => {
              if (estado.estadoabrev == 'DF' && cargo.codigo == 7) {
                cargo.nome = 'Deputado Distrital';
              }

              navigation.dispatch(
                StackActions.push('Candidatos', { estado, cargo })
              );
            }}
          />
        ))}
      </Card>
    </Content>
  );
};

export default Estado;
