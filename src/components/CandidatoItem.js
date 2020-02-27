import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import ImageProgress from 'react-native-image-progress';
import Circle from 'react-native-progress/Circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../core/colors';

const CandidatoItemComponent = ({ candidato, onPress, last, index }) => {
  if (candidato.descricaoSituacao !== 'Indeferido') {
    return (
      <TouchableNativeFeedback onPress={() => onPress(candidato)}>
        <View
          style={[
            !last
              ? {
                  borderBottomColor: colors.greyNew,
                  borderBottomWidth: 1,
                  backgroundColor: colors.white
                }
              : {
                  backgroundColor: colors.white,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15
                },
            index == 0
              ? { borderTopLeftRadius: 15, borderTopRightRadius: 15 }
              : {}
          ]}
        >
          <ImageProgress
            indicator={Circle}
            style={style.imageProgress}
            imageStyle={{ resizeMode: 'cover', borderRadius: 100 }}
            source={{ uri: 'https://i.stack.imgur.com/34AD2.jpg' }}
            indicatorProps={{ size: 20, borderWidth: 0, color: colors.accent }}
          />
          <View style={style.text}>
            <Text numberOfLines={1} style={style.title}>
              {candidato.nomeCompleto}
            </Text>
            <Text numberOfLines={1} style={style.description}>
              {`${candidato.partido.sigla} - ${candidato.nomeColigacao}`}
            </Text>
            <SimpleLineIcons
              style={{ position: 'absolute', right: 15, top: 22 }}
              name="arrow-right"
              size={15}
              color={colors.gray}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  } else {
    return <View />;
  }
};

const style = {
  imageProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: 40,
    height: 40,
    marginTop: 9,
    marginLeft: 9
  },
  text: { flexDirection: 'column', padding: 10, marginLeft: 50, zIndex: 0 },
  title: { textAlign: 'left', color: colors.black, fontSize: 15, width: '90%' },
  description: {
    textAlign: 'left',
    color: colors.gray,
    fontSize: 12,
    fontWeight: 'bold',
    width: '90%'
  }
};

CandidatoItemComponent.propTypes = {
  candidato: PropTypes.object,
  last: PropTypes.bool,
  onPress: PropTypes.func,
  index: PropTypes.number
};

CandidatoItemComponent.defaultProps = {
  candidato: {},
  last: false
};

export default CandidatoItemComponent;
