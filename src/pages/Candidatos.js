import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';
import LoadingScroll from '../components/LoadingScroll';
import CandidatoItem from '../components/CandidatoItem';

import { getCandidatos } from '../services';
import styles from '../styles';
import colors from '../colors';

const Candidatos = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [page, setPage] = useState(0);
  const [candidatos, setCandidatos] = useState([]);
  const [allCandidatos, setAllCandidatos] = useState([]);
  const [allCompleteCandidatos, setAllCompleteCandidatos] = useState([]);

  useEffect(() => {
    getData();
    navigation.setOptions({
      headerTitle:
        route.params.estado.estadoabrev == 'DF' &&
        route.params.cargo.codigo == '7'
          ? 'Deputado Distrital'
          : route.params.cargo.nome
    });
  }, []);

  getData = async () => {
    let cardoCodigo = route.params.cargo.codigo;

    if (
      route.params.estado.estadoabrev == 'DF' &&
      route.params.cargo.codigo == '7'
    ) {
      cardoCodigo = '8';
    }

    setLoading(true);

    let result = await getCandidatos(
      route.params.estado.estadoabrev,
      cardoCodigo
    );

    setLoading(false);

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
      result = Object.values(result);

      for (let i = 0; i < result.length; i++) {
        result[i].partido = { sigla: result[i].partido };
        result[i].cargo = {
          nome: route.params.cargo.nome,
          codigo: result[i].cargo
        };
      }

      setCandidatos(result.slice(0, 15));
      setAllCandidatos(result);
      setAllCompleteCandidatos(result);
      setPage(1);
    }
  };

  const openCandidato = candidato => {
    candidato.ufCandidatura = route.params.estado.estadoabrev;

    navigation.dispatch(
      StackActions.push('CandidatoTab', {
        candidato,
        estado: route.params.estado
      })
    );
  };

  const onEndScroll = () => {
    if (page !== 0) {
      setScroll(true);

      setScroll(false);
      setCandidatos(
        candidatos.concat(allCandidatos.slice(page * 15, page * 15 + 15))
      );
      setPage(page + 1);
    }
  };

  const onSearch = text => {
    if (text) {
      const result = allCompleteCandidatos.filter(item =>
        item.nome.toLowerCase().includes(text.toLowerCase())
      );
      setCandidatos(result.slice(0, 15));
      setAllCandidatos(result);
    } else {
      setAllCandidatos(allCompleteCandidatos);
      setCandidatos(allCompleteCandidatos(0, 15));
    }

    setPage(1);
  };

  return (
    <Content loading={loading} search={true} onChangeTextSearch={onSearch}>
      <Card containerStyle={{ padding: 0, borderRadius: 15 }}>
        <TitleEstado estado={route.params.estado} />
      </Card>
      <Card containerStyle={styles.card}>
        <FlatList
          style={{ flex: 1, borderRadius: 15 }}
          keyExtractor={index => index + ''}
          data={candidatos}
          renderItem={({ item, index }) => (
            <CandidatoItem
              index={index}
              candidato={item}
              last={index == candidatos.length - 1}
              onPress={candidato => openCandidato(candidato)}
            />
          )}
          refreshing={true}
          onEndReachedThreshold={0.5}
          onEndReached={onEndScroll}
        />
      </Card>
      <LoadingScroll loading={scroll && !loading} />
    </Content>
  );
};

export default Candidatos;
