import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Share from 'react-native-share';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Detalhes from './containers/Detalhes';
import Bens from './containers/Bens';
import Eleicoes from './containers/Eleicoes';
import Financas from './containers/Financas';

import { coresPartidos } from '../../core/constants';
import colors from '../../core/colors';

const Tab = createBottomTabNavigator();

const CandidatoScreen = ({ navigation, route }) => {
  useEffect(() => {
    const backgroundColor =
      coresPartidos[
        route.params.candidato.partido.sigla.toLowerCase().replace(/\s+/g, '')
      ];

    navigation.setOptions({
      headerTitle: route.params.candidato.nome,
      headerStyle: { backgroundColor, elevation: 0 },
      headerTintColor: colors.white,
      headerRight: () => (
        <TouchableOpacity onPress={() => share()}>
          <Entypo
            name="share"
            size={25}
            color={colors.white}
            style={{ marginRight: 20, marginTop: 2 }}
          />
        </TouchableOpacity>
      )
    });
  }, []);

  const share = () => {
    let mensagem = `Veja tudo sobre ${route.params.candidato.nomeUrna}`;
    mensagem +=
      route.params.candidato.descricaoSexo == 'FEM.'
        ? ', candidata a '
        : ', candidato a ';
    mensagem += route.params.candidato.cargo.nome;
    mensagem += route.params.estado
      ? ' pelo estado de ' + route.params.estado.estado
      : ' pelo Brasil';

    Share.open({
      title: 'Eleições 2018',
      message: mensagem,
      url: '. Acesse http://goo.gl/VB5zB6.',
      subject: 'Compartilhar Candidato'
    });
  };

  const BensScreen = () => <Bens {...route.params} />;
  const FinancasScreen = () => <Financas {...route.params} />;
  const EleicoesScreen = () => <Eleicoes {...route.params} />;
  const DetalhesScreen = () => <Detalhes {...route.params} />;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.grey,
        inactiveTintColor: colors.gray,
        style: styles.tab,
        indicatorStyle: { backgroundColor: colors.primary, top: 1 },
        labelStyle: { fontSize: 10, marginTop: 0, marginBottom: 0 },
        iconStyle: { marginBottom: 0, marginTop: 0 }
      }}
    >
      <Tab.Screen
        name="CandidatoDetalhe"
        component={DetalhesScreen}
        options={{
          title: 'Candidato',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="CandidatoBens"
        component={BensScreen}
        options={{
          title: 'Bens',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="CandidatoEleicoes"
        component={EleicoesScreen}
        options={{
          title: 'Candidaturas',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="star" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="CandidatoFinancas"
        component={FinancasScreen}
        options={{
          title: 'Finanças',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="coins" size={22} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  tab: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    backgroundColor: '#F5F4F4'
  }
};

export default CandidatoScreen;
