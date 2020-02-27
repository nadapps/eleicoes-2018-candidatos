import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';

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
  const EleicoesScreen = () => <Eleicoes {...route.params} />;
  const DetalhesScreen = () => <Detalhes {...route.params} />;

  return (
    <Tab.Navigator>
      <Tab.Screen name="CandidatoDetalhe" component={DetalhesScreen} />
      <Tab.Screen name="CandidatoBens" component={BensScreen} />
      <Tab.Screen name="CandidatoEleicoes" component={EleicoesScreen} />
      <Tab.Screen name="CandidatoFinancas" component={BensScreen} />
    </Tab.Navigator>
  );
};

export default CandidatoScreen;
