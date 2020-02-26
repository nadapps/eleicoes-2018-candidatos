import React from 'react';
import { View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

import ContentCandidato from '../components/ContentCandidato';

import { getCandidato } from '../services/candidatos';
import colors from '../core/colors';

export default class CandidatoEleicoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      candidato: {
        id: props.navigation.state.params.candidato.id,
        partido: props.navigation.state.params.candidato.partido,
        eleicoesAnteriores: []
      },
      eleicoesAnteriores: [],
      estado: props.navigation.state.params.estado,
      loading: true
    };
  }

  async componentDidMount() {
    let result = await getCandidato(
      this.state.estado ? this.state.estado.estadoabrev : 'BR',
      this.state.candidato.id
    );

    let eleicoesAnteriores = [];

    for (let i = 0; i < result.eleicoesAnteriores.length; i++) {
      eleicoesAnteriores.push({
        time: result.eleicoesAnteriores[i].nrAno,
        title:
          result.eleicoesAnteriores[i].cargo +
          ' - ' +
          result.eleicoesAnteriores[i].local,
        description: result.eleicoesAnteriores[i].partido
      });
    }

    this.setState({ candidato: result, loading: false, eleicoesAnteriores });
  }

  render() {
    return (
      <ContentCandidato
        loading={this.state.loading}
        candidato={this.state.candidato}
      >
        <View style={{ padding: 15, paddingBottom: 0 }}>
          <Timeline
            circleColor={colors.gray}
            data={this.state.eleicoesAnteriores}
            lineColor={colors.gray}
            innerCircle={'dot'}
          />
        </View>
      </ContentCandidato>
    );
  }
}
