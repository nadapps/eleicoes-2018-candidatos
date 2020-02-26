import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-elements';
import { Row, Col } from 'react-native-easy-grid';
import { StackActions, useNavigation } from '@react-navigation/native';

import styles from '../../../core/styles';
import colors from '../../../core/colors';
import NumeroUrna from '../../../components/NumeroUrna';

const MeuCandidatoComponent = ({
  titulo,
  candidatos,
  estado,
  cargo,
  onRemove,
  last
}) => {
  const navigation = useNavigation();

  const openCandidato = candidato => {
    candidato.cargo = cargo;
    if (estado) {
      candidato.ufCandidatura = estado.estadoabrev;
    } else {
      candidato.ufCandidatura = 'BR';
    }

    navigation.dispatch(StackActions.push('Candidato', { candidato, estado }));
  };

  const onRemoverCandidato = candidato => {
    Alert.alert(
      '',
      `Deseja Remover ${candidato.nomeUrna}?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            let data = candidatos;

            data = data.filter(item => item.id !== candidato.id);

            if (cargo.nome == 'Presidente') {
              await AsyncStorage.setItem(
                '@Eleicoes2018:meupresidente',
                JSON.stringify(data)
              );
            } else if (cargo.nome == 'Governador') {
              await AsyncStorage.setItem(
                '@Eleicoes2018:meugovernador',
                JSON.stringify(data)
              );
            } else if (cargo.nome == 'Senador') {
              await AsyncStorage.setItem(
                '@Eleicoes2018:meusenador',
                JSON.stringify(data)
              );
            } else if (cargo.nome == 'Deputado Federal') {
              await AsyncStorage.setItem(
                '@Eleicoes2018:meudeputadofederal',
                JSON.stringify(data)
              );
            } else if (
              cargo.nome == 'Deputado Estadual' ||
              cargo.nome == 'Deputado Distrital'
            ) {
              await AsyncStorage.setItem(
                '@Eleicoes2018:meudeputadoestadual',
                JSON.stringify(data)
              );
            }
            ToastAndroid.show(
              'Candidato removido dos Favoritos',
              ToastAndroid.SHORT
            );

            onRemove();
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Card
      containerStyle={{
        marginBottom: last ? 15 : 0,
        borderRadius: 15
      }}
      wrapperStyle={{ paddingTop: 0 }}
    >
      <Row>
        <Col>
          <Text style={styles.titleMeuCandidato}>{titulo}</Text>
        </Col>
      </Row>
      <Row>
        {[0, 1, 2].map(index => (
          <Col key={index}>
            {candidatos[index] && (
              <View>
                <TouchableOpacity
                  onPress={() => openCandidato(candidatos[index])}
                  onLongPress={() => onRemoverCandidato(candidatos[index])}
                >
                  <Card
                    containerStyle={{ margin: 5, zIndex: 0 }}
                    wrapperStyle={{ padding: 0, zIndex: 0 }}
                    image={{ uri: candidatos[index].fotoUrl }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 100,
                    bottom: 10,
                    left: 0,
                    width: '100%'
                  }}
                >
                  <NumeroUrna
                    numero={candidatos[index].numero + ''}
                    fontSize={10}
                    padding={4}
                  />
                </View>
              </View>
            )}

            {candidatos[index] == null && (
              <TouchableOpacity
                style={{ zIndex: 0 }}
                onPress={() => {
                  if (estado) {
                    navigation.dispatch(
                      StackActions.push('Candidatos', { estado, cargo })
                    );
                  } else {
                    navigation.dispatch(StackActions.push('Presidentes', {}));
                  }
                }}
              >
                <Card
                  containerStyle={{ margin: 5 }}
                  wrapperStyle={{ padding: 0 }}
                  image={require('../../../assets/img/img_selecione.png')}
                />
              </TouchableOpacity>
            )}
            {estado && !candidatos[index] && (
              <View
                style={{
                  position: 'absolute',
                  right: 15,
                  bottom: 10,
                  width: 25,
                  height: 18,
                  zIndex: 100
                }}
              >
                <Image
                  source={{ uri: estado.bandeira }}
                  style={{ width: 25, height: 18 }}
                />
              </View>
            )}
            <Text
              style={{
                position: 'absolute',
                zIndex: 100,
                left: 15,
                top: 10,
                fontWeight: 'bold',
                fontSize: 15,
                color: colors.accent
              }}
            >
              {index + 1}°
            </Text>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

MeuCandidatoComponent.propTypes = {
  candidatos: PropTypes.array,
  titulo: PropTypes.string,
  last: PropTypes.bool,
  estado: PropTypes.object,
  cargo: PropTypes.object,
  onRemove: PropTypes.func
};

MeuCandidatoComponent.defaultProps = {
  candidatos: {},
  titulo: '',
  last: false,
  estado: null,
  cargo: {}
};

export default MeuCandidatoComponent;
