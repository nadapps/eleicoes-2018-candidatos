import React from 'react';
import { FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';
import Snackbar from 'react-native-snackbar';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';
import LoadingScroll from '../components/LoadingScroll';
import CandidatoItem from '../components/CandidatoItem';

import { candidatosApuracao } from '../services';
import styles from '../styles';
import colors from '../colors';

export default class Apuracao extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params.estado.estadoabrev == 'DF' &&
      navigation.state.params.cargo.codigo == '7'
        ? 'Deputado Distrital'
        : navigation.state.params.cargo.nome
  });

  constructor(props) {
    super(props);

    if (
      props.navigation.state.params.estado.estadoabrev == 'DF' &&
      props.navigation.state.params.cargo.codigo == '7'
    ) {
      props.navigation.state.params.cargo.codigo = '8';
    }

    this.state = {
      estado: props.navigation.state.params.estado,
      cargo: props.navigation.state.params.cargo,
      candidatos: [],
      allCandidatos: [],
      allCompleteCandidatos: [],
      ids: [],
      loading: true,
      search: false,
      scroll: false,
      page: 0
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    this.setState({ loading: true });
    let result = await candidatosApuracao(
      this.state.estado.estadoabrev,
      this.state.cargo.codigo
    );

    result = result.cand;

    if (!result) {
      this.setState({ loading: false });
      Snackbar.show({
        title: 'Oops, parece que existe um erro de conexão!',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Tentar Novamente!',
          color: colors.accent,
          onPress: async () => {
            await this.getData();
          }
        }
      });
    } else {
      let allCandidatos = result;
      let allCompleteCandidatos = result;
      let candidatos = result.slice(0, 15);

      this.setState({
        allCandidatos,
        allCompleteCandidatos,
        candidatos,
        loading: false,
        page: 1
      });
    }
  }

  openCandidato = (candidato, id) => {
    candidato.fotoUrl =
      'http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse=' +
      candidato.id;
    candidato.ufCandidatura = this.state.estado.estadoabrev;

    const resetAction = StackActions.push({
      index: 0,
      params: { candidato, estado: this.state.estado },
      routeName: 'CandidatoTab'
    });
    this.props.navigation.dispatch(resetAction);
  };

  onEndScroll = () => {
    if (this.state.page != 0) {
      this.setState({ scroll: true });
      let candidatos = this.state.candidatos;
      candidatos = candidatos.concat(
        this.state.allCandidatos.slice(
          this.state.page * 15,
          this.state.page * 15 + 15
        )
      );
      this.setState({ candidatos, scroll: false, page: this.state.page + 1 });
    }
  };

  search = text => {
    if (text != '') {
      let newList = [];
      for (let i = 0; i < this.state.allCompleteCandidatos.length; i++) {
        if (
          this.state.allCompleteCandidatos[i].nome.toLowerCase().includes(text)
        ) {
          newList.push(this.state.allCompleteCandidatos[i]);
        }
      }
      this.setState({
        candidatos: newList.slice(0, 15),
        allCandidatos: newList,
        page: 1
      });
    } else {
      this.setState({
        candidatos: this.state.allCompleteCandidatos.slice(0, 15),
        allCandidatos: this.state.allCompleteCandidatos,
        page: 1
      });
    }
  };

  render() {
    return (
      <Content
        loading={this.state.loading}
        search={true}
        onChangeTextSearch={this.search}
      >
        <Card containerStyle={{ padding: 0, borderRadius: 15 }}>
          <TitleEstado estado={this.state.estado} />
        </Card>
        <Card containerStyle={styles.card}>
          <FlatList
            style={{ flex: 1, borderRadius: 15 }}
            keyExtractor={index => index + ''}
            data={this.state.candidatos}
            renderItem={({ item, index }) => (
              <CandidatoItem
                index={index}
                candidato={item}
                last={index == this.state.candidatos.length - 1}
                onPress={(candidato, id) => this.openCandidato(candidato, id)}
              />
            )}
            refreshing={true}
            onEndReachedThreshold={0.5}
            onEndReached={this.onEndScroll}
          />
        </Card>
        <LoadingScroll loading={this.state.scroll && !this.state.loading} />
      </Content>
    );
  }
}
