import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

import ContentCandidato from '../../../components/ContentCandidato';

import { getCandidato } from '../../../services/candidatos';
import colors from '../../../core/colors';
import { add } from 'react-native-reanimated';

const CandidatoEleicoesScreen = ({ candidato: candidatoProp, estado }) => {
  const [loading, setLoading] = useState(true);
  const [candidato, setCandidato] = useState({
    id: candidatoProp.id,
    partido: candidatoProp.partido
  });
  const [eleicoes, setEleicoes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getCandidato(
        estado ? estado.estadoabrev : 'BR',
        candidatoProp.id
      );

      const eleicoes = result.eleicoesAnteriores.reduce((acc, item) => {
        acc.push({
          time: item.nrAno,
          title: `${item.cargo} - ${item.local}`,
          description: item.partido
        });

        return acc;
      }, []);

      setEleicoes(eleicoes);
      setCandidato(candidato);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <ContentCandidato loading={loading} candidato={candidato}>
      <View style={{ padding: 15, paddingBottom: 0 }}>
        <Timeline
          circleColor={colors.gray}
          data={eleicoes}
          lineColor={colors.gray}
          innerCircle="dot"
        />
      </View>
    </ContentCandidato>
  );
};

export default CandidatoEleicoesScreen;
