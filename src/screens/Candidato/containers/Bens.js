import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import ContentCandidato from '../../../components/ContentCandidato';

import { getCandidato } from '../../../services/candidatos';
import { numeroParaReal } from '../../../core/constants';
import styles from '../../../core/styles';

const CandidatoBensScreen = ({ candidato: candidatoProp, estado }) => {
  const [loading, setLoading] = useState(true);
  const [candidato, setCandidato] = useState({
    id: candidatoProp.id,
    partido: candidatoProp.partido,
    bens: []
  });

  useEffect(() => {
    const getData = async () => {
      const result = await getCandidato(
        estado ? estado.estadoabrev : 'BR',
        candidatoProp.id
      );
      setCandidato(result);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <ContentCandidato loading={loading} candidato={candidato}>
      <Text style={styles.titleSection}>
        Total de Bens: {numeroParaReal(candidato.totalDeBens)}
      </Text>
      {candidato.bens.map((item, index) => (
        <ListItem
          key={item.ordem + ''}
          containerStyle={
            index == candidato.bens.length - 1 ? { borderBottomWidth: 0 } : {}
          }
          title={item.descricaoDeTipoDeBem}
          subtitle={numeroParaReal(item.valor)}
          hideChevron={true}
        />
      ))}
    </ContentCandidato>
  );
};

export default CandidatoBensScreen;
