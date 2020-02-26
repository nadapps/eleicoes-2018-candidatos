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
        navigation.state.params.candidato.partido.sigla
          .toLowerCase()
          .replace(/\s+/g, '')
      ];

    navigation.dangerouslyGetParent().setOptions({
      title: navigation.state.params.candidato.nome,
      headerTitle: backgroundColor,
      headerRight: (
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
    let mensagem = 'Veja tudo sobre ' + candidato.nomeUrna;
    mensagem +=
      candidato.descricaoSexo == 'FEM.' ? ', candidata a ' : ', candidato a ';
    mensagem += candidato.cargo.nome;
    mensagem += estado ? ' pelo estado de ' + estado.estado : ' pelo Brasil';
    Share.open({
      title: 'Eleições 2018',
      message: mensagem,
      url: '. Acesse http://goo.gl/VB5zB6.',
      subject: 'Compartilhar Candidato'
    });
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CandidatoDetalhe"
        component={() => <CandidatoDetalhe {...route.params} />}
      />
      <Tab.Screen
        name="CandidatoBens"
        component={() => <CandidatoBens {...route.params} />}
      />
      <Tab.Screen
        name="CandidatoEleicoes"
        component={() => <CandidatoEleicoes {...route.params} />}
      />
      <Tab.Screen
        name="CandidatoFinancas"
        component={() => <CandidatoFinancas {...route.params} />}
      />
    </Tab.Navigator>
  );
};

export default CandidatoScreen;
