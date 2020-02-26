import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';

import Content from '../../components/Content';
import TitleEstado from '../../components/TitleEstado';
import Card from '../../components/Card';

import { cargos } from '../../constants';

const Estado = ({ navigation, route }) => (
  <Content>
    <Card>
      <TitleEstado estado={route.params.estado} />
    </Card>
    <Card>
      {cargos.map((cargo, index) => (
        <ListItem
          component={TouchableOpacity}
          key={cargo.codigo + ''}
          title={
            route.params.estado.estadoabrev == 'DF' && cargo.codigo == 7
              ? 'Deputado Distrital'
              : cargo.nome
          }
          containerStyle={[
            index == cargos.length - 1 ? { borderBottomWidth: 0 } : {}
          ]}
          onPress={() => {
            if (route.params.estado.estadoabrev == 'DF' && cargo.codigo == 7) {
              cargo.nome = 'Deputado Distrital';
            }

            navigation.dispatch(
              StackActions.push('Candidatos', {
                estado: route.params.estado,
                cargo
              })
            );
          }}
        />
      ))}
    </Card>
  </Content>
);

export default Estado;
