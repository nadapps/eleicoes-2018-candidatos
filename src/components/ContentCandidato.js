import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import ImageProgress from 'react-native-image-progress';
import Circle from 'react-native-progress/Circle';
import { Card } from 'react-native-elements';

import Content from './Content';

import styles from '../styles';
import colors from '../core/colors';
import { coresPartidos } from '../constants';

let bandeirasPartidos = {
  avante: require('../../assets/img/partidos/avante.jpg'),
  dc: require('../../assets/img/partidos/dc.jpg'),
  dem: require('../../assets/img/partidos/dem.jpg'),
  mdb: require('../../assets/img/partidos/mdb.jpg'),
  novo: require('../../assets/img/partidos/novo.jpg'),
  patri: require('../../assets/img/partidos/patri.jpg'),
  pcb: require('../../assets/img/partidos/pcb.jpg'),
  pcdob: require('../../assets/img/partidos/pcdob.jpg'),
  pco: require('../../assets/img/partidos/pco.jpg'),
  pdt: require('../../assets/img/partidos/pdt.jpg'),
  phs: require('../../assets/img/partidos/phs.jpg'),
  pmb: require('../../assets/img/partidos/pmb.jpg'),
  pmn: require('../../assets/img/partidos/pmn.jpg'),
  pode: require('../../assets/img/partidos/pode.jpg'),
  pp: require('../../assets/img/partidos/pp.jpg'),
  ppl: require('../../assets/img/partidos/ppl.jpg'),
  pps: require('../../assets/img/partidos/pps.jpg'),
  pr: require('../../assets/img/partidos/pr.jpg'),
  prb: require('../../assets/img/partidos/prb.jpg'),
  pros: require('../../assets/img/partidos/pros.jpg'),
  prp: require('../../assets/img/partidos/prp.jpg'),
  prtb: require('../../assets/img/partidos/prtb.jpg'),
  psb: require('../../assets/img/partidos/psb.jpg'),
  psc: require('../../assets/img/partidos/psc.jpg'),
  psd: require('../../assets/img/partidos/psd.jpg'),
  psdb: require('../../assets/img/partidos/psdb.jpg'),
  psl: require('../../assets/img/partidos/psl.jpg'),
  psol: require('../../assets/img/partidos/psol.jpg'),
  pstu: require('../../assets/img/partidos/pstu.jpg'),
  pt: require('../../assets/img/partidos/pt.jpg'),
  ptb: require('../../assets/img/partidos/ptb.jpg'),
  ptc: require('../../assets/img/partidos/ptc.jpg'),
  pv: require('../../assets/img/partidos/pv.jpg'),
  rede: require('../../assets/img/partidos/rede.jpg'),
  solidariedade: require('../../assets/img/partidos/solidariedade.jpg')
};

class ContentCandidato extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bandeiraPartido = {};
    let backgroundColor1 = colors.accent;

    if (this.props.candidato.partido.sigla) {
      bandeiraPartido =
        bandeirasPartidos[
          this.props.candidato.partido.sigla.toLowerCase().replace(/\s+/g, '')
        ];
      backgroundColor1 =
        coresPartidos[
          this.props.candidato.partido.sigla.toLowerCase().replace(/\s+/g, '')
        ];
    }

    return (
      <Content
        loading={this.props.loading}
        style={{ backgroundColor: backgroundColor1 }}
        statusColor={backgroundColor1}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 10,
            flex: 1,
            flexDirection: 'row',
            zIndex: 1000
          }}
        >
          <Row>
            <Col
              style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
              size={50}
            >
              <ImageProgress
                indicator={Circle}
                style={styles.imageCandidato}
                source={{ uri: this.props.candidato.fotoUrl }}
                indicatorProps={{
                  size: 40,
                  borderWidth: 0,
                  color: colors.accent
                }}
              />
            </Col>
            <Col size={50}>
              <Image
                style={styles.imagePartido}
                source={bandeiraPartido}
                resizeMode="contain"
              />
            </Col>
          </Row>
        </View>
        <View style={{ zIndex: 0, marginTop: 100 }}>
          <Card containerStyle={styles.card}>
            <View style={{ paddingTop: 45 }}>{this.props.children}</View>
          </Card>
        </View>
      </Content>
    );
  }
}

ContentCandidato.propTypes = {
  loading: PropTypes.bool,
  candidato: PropTypes.object
};

ContentCandidato.defaultProps = {
  loading: false,
  candidato: {}
};

export default ContentCandidato;
