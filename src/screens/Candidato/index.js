import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';

import CandidatoDetalhe from '../CandidatoDetalhe';
import CandidatoBens from '../CandidatoBens';
import CandidatoEleicoes from '../CandidatoEleicoes';
import CandidatoFinancas from '../CandidatoFinancas';

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

  const CandidatoBensScreen = () => <CandidatoBens {...route.params} />;
  const CandidatoEleicoesScreen = () => <CandidatoEleicoes {...route.params} />;

  return (
    <Tab.Navigator>
      <Tab.Screen name="CandidatoDetalhe" component={CandidatoBensScreen} />
      <Tab.Screen name="CandidatoBens" component={CandidatoBensScreen} />
      <Tab.Screen
        name="CandidatoEleicoes"
        component={CandidatoEleicoesScreen}
      />
      <Tab.Screen name="CandidatoFinancas" component={CandidatoBensScreen} />
    </Tab.Navigator>
  );
};

export default CandidatoScreen;
