import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import colors from '../core/colors';

const TitleEstadoComponent = ({ estado }) => (
  <View style={style.root}>
    <Image
      resizeMode="cover"
      style={style.image}
      source={{ uri: estado.bandeira }}
    />
    <Text style={style.text}>{estado.estado}</Text>
  </View>
);

const style = {
  root: { flexDirection: 'row', margin: 15 },
  text: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 2
  },
  image: { width: 45, height: 32 }
};

TitleEstadoComponent.propTypes = {
  estado: PropTypes.object
};

export default TitleEstadoComponent;
