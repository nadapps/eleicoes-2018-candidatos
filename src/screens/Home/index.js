import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';

import Content from '../../components/Content';
import MeuCandidato from './components/MeuCandidato';

import { getEstado, getCargo } from '../../constants';

const Home = ({ navigation }) => {
  const [meusCandidatos, setMeusCandidatos] = useState({
    presidentes: [],
    governadores: [],
    senadores: [],
    deputadosFederais: [],
    deputadosEstaduais: []
  });
  const [estado, setEstado] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const estadoStorage = await AsyncStorage.getItem('@Eleicoes2018:estado');
    if (estadoStorage == null) {
      navigation.dispatch(StackActions.replace('Login'));
    } else {
      setEstado(getEstado(estadoStorage));

      const presidentes = JSON.parse(
        await AsyncStorage.getItem('@Eleicoes2018:meupresidente')
      );

      const governadores = JSON.parse(
        await AsyncStorage.getItem('@Eleicoes2018:meugovernador')
      );

      const senadores = JSON.parse(
        await AsyncStorage.getItem('@Eleicoes2018:meusenador')
      );

      const deputadosFederais = JSON.parse(
        await AsyncStorage.getItem('@Eleicoes2018:meudeputadofederal')
      );

      const deputadosEstaduais = JSON.parse(
        await AsyncStorage.getItem('@Eleicoes2018:meudeputadoestadual')
      );

      setMeusCandidatos({
        presidentes: presidentes || [],
        governadores: governadores || [],
        senadores: senadores || [],
        deputadosFederais: deputadosFederais || [],
        deputadosEstaduais: deputadosEstaduais || []
      });
    }
  };

  return (
    <Content>
      <MeuCandidato
        titulo="Suas opções para Presidente"
        candidatos={meusCandidatos.presidentes}
        cargo={{ codigo: '1', nome: 'Presidente' }}
        onRemove={() => getData()}
      />
      <MeuCandidato
        titulo="Suas opções para Governador"
        estado={estado}
        candidatos={meusCandidatos.governadores}
        cargo={getCargo('Governador')}
        onRemove={() => getData()}
      />
      <MeuCandidato
        titulo="Suas opções para Senador"
        estado={estado}
        candidatos={meusCandidatos.senadores}
        cargo={getCargo('Senador')}
        onRemove={() => getData()}
      />
      <MeuCandidato
        titulo="Suas opções para Deputado Federal"
        estado={estado}
        candidatos={meusCandidatos.deputadosFederais}
        cargo={getCargo('Deputado Federal')}
        onRemove={() => getData()}
      />
      <MeuCandidato
        titulo={`Suas opções para Deputado ${
          estado.estadoabrev === 'DF' ? 'Distrital' : 'Estadual'
        }`}
        estado={estado}
        last={true}
        candidatos={meusCandidatos.deputadosEstaduais}
        cargo={getCargo('Deputado Estadual')}
        onRemove={() => getData()}
      />
    </Content>
  );
};

export default Home;
