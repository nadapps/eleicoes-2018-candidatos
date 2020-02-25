import React from 'react';
import { AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/core';

import Content from '../components/Content';
import MeuCandidato from '../components/MeuCandidato';

export default class MeusCandidatos extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.addListener('willFocus', payload => {
      this.props.navigation.setParams({ title: 'Meus Candidatos' });
    });

    this.state = {
      meupresidente: {},
      meugovernador: {},
      meusenador: {},
      meudeputadofederal: {},
      meudeputadoestadual: {}
    };
  }

  async componentDidMount() {
    let emailStorage = await AsyncStorage.getItem('@Eleicoes2018:email');
    if (emailStorage == null) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [CommonActions.navigate({ routeName: 'Login' })]
      });
      this.props.navigation.dispatch(resetAction);
    }
    let meupresidente = JSON.parse(
      await AsyncStorage.getItem('@Eleicoes2018:meupresidente')
    );
    if (meupresidente != null) this.setState({ meupresidente });

    let meugovernador = JSON.parse(
      await AsyncStorage.getItem('@Eleicoes2018:meugovernador')
    );
    if (meugovernador != null) this.setState({ meugovernador });

    let meusenador = JSON.parse(
      await AsyncStorage.getItem('@Eleicoes2018:meusenador')
    );
    if (meusenador != null) this.setState({ meusenador });

    let meudeputadofederal = JSON.parse(
      await AsyncStorage.getItem('@Eleicoes2018:meudeputadofederal')
    );
    if (meudeputadofederal != null) this.setState({ meudeputadofederal });

    let meudeputadoestadual = JSON.parse(
      await AsyncStorage.getItem('@Eleicoes2018:meudeputadoestadual')
    );
    if (meudeputadoestadual != null) this.setState({ meudeputadoestadual });
  }

  openEstado = estado => {
    const resetAction = StackActions.push({
      index: 0,
      params: { estado },
      routeName: 'Estado'
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Content>
        <MeuCandidato candidato={this.state.meupresidente} cargo="Presidente" />
        <MeuCandidato candidato={this.state.meugovernador} cargo="Governador" />
        <MeuCandidato candidato={this.state.meusenador} cargo="Senador" />
        <MeuCandidato
          candidato={this.state.meudeputadofederal}
          cargo="Deputado Federal"
        />
        <MeuCandidato
          candidato={this.state.meudeputadoestadual}
          cargo="Deputado Estadual"
        />
      </Content>
    );
  }
}
