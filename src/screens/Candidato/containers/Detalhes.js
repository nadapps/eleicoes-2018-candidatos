import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';

import ContentCandidato from '../../../components/ContentCandidato';
import NumeroUrna from '../../../components/NumeroUrna';
import RedesSociais from '../../../components/RedesSociais';
import ItemCandidato from '../../../components/ItemCandidato';

import { getCandidato } from '../../../services/candidatos';
import styles from '../../../core/styles';

const CandidatoDetalhesScreen = ({ candidato: candidatoProp, estado }) => {
  const [loading, setLoading] = useState(true);
  const [candidato, setCandidato] = useState({
    id: candidatoProp.id,
    sites: [],
    partido: candidatoProp.partido,
    numero: '',
    dataDeNascimento: '',
    vices: []
  });
  useEffect(() => {
    const getData = async () => {
      let result = await getCandidato(
        estado ? estado.estadoabrev : 'BR',
        candidatoProp.id
      );

      if (!result.vices) result.vices = [];

      result.dataDeNascimento = result.dataDeNascimento
        .split('-')
        .reverse()
        .join('/');

      let redes = [];
      result.sites.map(site => {
        const contain = redes.some(
          rede =>
            (site.includes('facebook') && rede.includes('facebook')) ||
            (site.includes('instagram') && rede.includes('instagram')) ||
            (site.includes('youtube') && rede.includes('youtube')) ||
            (site.includes('twitter') && rede.includes('twitter')) ||
            (site.includes('flickr') && rede.includes('flickr'))
        );
        if (!contain) redes.push(site);
      });
      result.sites = redes;

      setCandidato(result);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <ContentCandidato loading={loading} candidato={candidato}>
      <Row>
        <Col>
          <Text style={[styles.title]}>{candidato.nomeUrna}</Text>
          <NumeroUrna
            style={{ paddingTop: 5, paddingBottom: 0 }}
            numero={candidato.numero.toString()}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <View style={styles.line}></View>
          <Text style={styles.titleSection}>Redes Sociais</Text>
          <RedesSociais redes={candidato.sites} />
        </Col>
      </Row>
      <Row>
        <Col>
          <View style={styles.line}></View>
          <Text style={styles.titleSection}>Dados do Candidato</Text>
          <ItemCandidato
            title="Nome Completo:"
            value={candidato.nomeCompleto}
          />
          <ItemCandidato title="Ocupação:" value={candidato.ocupacao} />
          <ItemCandidato title="Sexo:" value={candidato.descricaoSexo} />
          <ItemCandidato
            title="Nascimento:"
            value={candidato.dataDeNascimento}
          />
          <ItemCandidato title="Coligação:" value={candidato.nomeColigacao} />
          <ItemCandidato
            title="Partidos:"
            value={candidato.composicaoColigacao}
          />
        </Col>
      </Row>
      {candidato.vices.length > 0 && (
        <View>
          <Row>
            <Col>
              <Text style={styles.titleSection}>Vice</Text>
            </Col>
          </Row>
          <Row>
            <Col size={30}>
              <Image
                style={styles.imageViceCandidato}
                source={{ uri: candidato.vices[0].urlFoto }}
              />
            </Col>
            <Col size={70}>
              <Text style={styles.titleVice}>{candidato.vices[0].nm_URNA}</Text>
              <Text style={styles.subtitle}>
                {candidato.vices[0].sg_PARTIDO}
              </Text>
            </Col>
          </Row>
        </View>
      )}
    </ContentCandidato>
  );
};

export default CandidatoDetalhesScreen;
