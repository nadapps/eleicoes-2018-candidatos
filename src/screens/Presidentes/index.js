import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import Content from '../../components/Content';
import CandidatoItem from '../../components/CandidatoItem';
import Card from '../../components/Card';

import { getCandidatos } from '../../services';

const PresidentesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    getData();
    navigation.dangerouslyGetParent().setOptions({
      headerTitle: 'Presidente'
    });
  }, []);

  const getData = async () => {
    setLoading(true);

    const result = await getCandidatos('BR', '1');

    if (!result) {
      Snackbar.show({
        title: 'Oops, parece que existe um erro de conexão!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Tentar Novamente!',
          color: colors.accent,
          onPress: () => getData()
        }
      });
    } else {
      setCandidatos(result);
    }

    setLoading(false);
  };

  const openCandidato = candidato => {
    candidato.ufCandidatura = 'BR';

    navigation.dispatch(
      StackActions.push('CandidatoTab', {
        candidato,
        estado: null
      })
    );
  };

  return (
    <Content loading={loading}>
      <Card>
        <FlatList
          style={{ flex: 1, borderRadius: 15 }}
          keyExtractor={item => item.id.toString()}
          data={candidatos}
          renderItem={({ item, index }) => (
            <CandidatoItem
              index={index}
              candidato={item}
              last={index == candidatos.length - 1}
              onPress={candidato => openCandidato(candidato)}
            />
          )}
        />
      </Card>
    </Content>
  );
};

export default PresidentesScreen;
