import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';

import ContentCandidato from '../../../../components/ContentCandidato';

import {
  getCandidatoGasto,
  getCandidato
} from '../../../../services/candidatos';
import { numeroParaReal } from '../../../../core/constants';
import style from './Financas.style';

const CandidatoFinancasContainer = ({ candidato: candidatoProp, estado }) => {
  const [loading, setLoading] = useState(true);
  const [candidato, setCandidato] = useState(candidatoProp);
  const [gasto, setGasto] = useState({ dadosConsolidados: {}, despesas: {} });

  useEffect(() => {
    const getData = async () => {
      const resultGasto = await getCandidatoGasto(
        estado ? estado.estadoabrev : 'BR',
        candidato.cargo.codigo,
        candidato.numero.toString().substr(0, 2),
        candidato.numero,
        candidato.id
      );
      const resultCandidato = await getCandidato(
        estado ? estado.estadoabrev : 'BR',
        candidato.id
      );

      setGasto(resultGasto);
      setCandidato(resultCandidato);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <ContentCandidato loading={loading} candidato={candidato}>
      <Grid>
        <Row>
          <View style={style.card}>
            <Text style={style.title}>Receitas</Text>
            {gasto.dadosConsolidados ? (
              <>
                <Text style={[style.subTitle, { color: '#43a047' }]}>
                  {numeroParaReal(gasto.dadosConsolidados.totalRecebido)}
                </Text>
                <Text style={[style.titleSection, { paddingBottom: 0 }]}>
                  {`Pessoas Físicas: ${numeroParaReal(
                    gasto.dadosConsolidados.totalReceitaPF
                  )}`}
                </Text>
                <Text style={style.titleSection}>
                  {`Partido: ${numeroParaReal(
                    gasto.dadosConsolidados.totalPartidos
                  )}`}
                </Text>
              </>
            ) : (
              <Text style={[style.subTitle, { color: '#43a047' }]}>
                Não Declarado
              </Text>
            )}
          </View>
        </Row>
        <Row>
          <View style={style.card}>
            <View style={style.line}></View>
            <Text style={style.title}>Despesas</Text>
            {gasto.despesas ? (
              <>
                <Text style={[style.subTitle, { color: '#f44336' }]}>
                  {numeroParaReal(gasto.despesas.totalDespesasContratadas)}
                </Text>
                <Text style={[style.titleSection, { paddingBottom: 0 }]}>
                  {`Limite: ${numeroParaReal(
                    gasto.despesas.valorLimiteDeGastos
                  )}`}
                </Text>
                <Text style={style.titleSection}>
                  {`Pagas: ${numeroParaReal(
                    gasto.despesas.totalDespesasPagas
                  )}`}
                </Text>
              </>
            ) : (
              <Text style={[style.subTitle, { color: '#f44336' }]}>
                Não Declarada
              </Text>
            )}
          </View>
        </Row>
      </Grid>
    </ContentCandidato>
  );
};

export default CandidatoFinancasContainer;
