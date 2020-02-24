import React, { Component } from 'react';
import {
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../colors';

export default class FavoritoCandidato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: 'star-border',
      visible: false,
      data: []
    };

    this.star();
  }

  async star() {
    let estado = await AsyncStorage.getItem('@Eleicoes2018:estado');

    if (
      this.props.candidato.ufCandidatura.toLowerCase() ===
        estado.toLowerCase() ||
      this.props.candidato.ufCandidatura.toLowerCase() === 'br'
    ) {
      let data = {};
      if (this.props.candidato.cargo.nome == 'Presidente')
        data = await AsyncStorage.getItem('@Eleicoes2018:meupresidente');
      else if (this.props.candidato.cargo.nome == 'Governador')
        data = await AsyncStorage.getItem('@Eleicoes2018:meugovernador');
      else if (this.props.candidato.cargo.nome == 'Senador')
        data = await AsyncStorage.getItem('@Eleicoes2018:meusenador');
      else if (this.props.candidato.cargo.nome == 'Deputado Federal')
        data = await AsyncStorage.getItem('@Eleicoes2018:meudeputadofederal');
      else if (
        this.props.candidato.cargo.nome == 'Deputado Estadual' ||
        this.props.candidato.cargo.nome == 'Deputado Distrital'
      )
        data = await AsyncStorage.getItem('@Eleicoes2018:meudeputadoestadual');

      if (data != null) data = JSON.parse(data);
      else data = [];

      let contains = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == this.props.candidato.id) contains = true;
      }

      if (contains) {
        this.setState({ icon: 'star' });
      }
      this.setState({ visible: true, data });
    }
  }

  async onPress() {
    if (this.state.icon == 'star') {
      let data = this.state.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == this.props.candidato.id) {
          data.splice(i, 1);
          break;
        }
      }

      if (this.props.candidato.cargo.nome == 'Presidente')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meupresidente',
          JSON.stringify(data)
        );
      else if (this.props.candidato.cargo.nome == 'Governador')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meugovernador',
          JSON.stringify(data)
        );
      else if (this.props.candidato.cargo.nome == 'Senador')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meusenador',
          JSON.stringify(data)
        );
      else if (this.props.candidato.cargo.nome == 'Deputado Federal')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meudeputadofederal',
          JSON.stringify(data)
        );
      else if (
        this.props.candidato.cargo.nome == 'Deputado Estadual' ||
        this.props.candidato.cargo.nome == 'Deputado Distrital'
      )
        await AsyncStorage.setItem(
          '@Eleicoes2018:meudeputadoestadual',
          JSON.stringify(data)
        );
      ToastAndroid.show('Candidato removido dos Favoritos', ToastAndroid.SHORT);

      this.setState({ icon: 'star-border', data });
    } else {
      if (this.state.data.length == 3) {
        ToastAndroid.show(
          'Limite de 3 candidatos atingido',
          ToastAndroid.SHORT
        );
        return;
      }

      let candidato = {
        id: this.props.candidato.id,
        nomeUrna: this.props.candidato.nomeUrna,
        numero: this.props.candidato.numero,
        fotoUrl: this.props.candidato.fotoUrl,
        partido: this.props.candidato.partido
      };

      let data = this.state.data;
      data.push(candidato);

      if (this.props.candidato.cargo.nome == 'Presidente')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meupresidente',
          JSON.stringify(data)
        );
      else if (this.props.candidato.cargo.nome == 'Governador')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meugovernador',
          JSON.stringify(data)
        );
      else if (this.props.candidato.cargo.nome == 'Senador')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meusenador',
          JSON.stringify(data)
        );
      else if (this.props.candidato.cargo.nome == 'Deputado Federal')
        await AsyncStorage.setItem(
          '@Eleicoes2018:meudeputadofederal',
          JSON.stringify(data)
        );
      else if (
        this.props.candidato.cargo.nome == 'Deputado Estadual' ||
        this.props.candidato.cargo.nome == 'Deputado Distrital'
      )
        await AsyncStorage.setItem(
          '@Eleicoes2018:meudeputadoestadual',
          JSON.stringify(data)
        );

      ToastAndroid.show('Candidato salvo em Favoritos', ToastAndroid.SHORT);

      this.setState({ icon: 'star', data });
    }
  }

  render() {
    if (this.state.visible)
      return (
        <TouchableOpacity
          onPress={() => {
            this.onPress();
          }}
        >
          <MaterialIcons
            style={{ marginRight: 10 }}
            name={this.state.icon}
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>
      );
    else return <View></View>;
  }
}
