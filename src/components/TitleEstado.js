import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import colors from '../core/colors';

const TitleEstadoComponent = ({ estado }) => (
  <View style={{ flexDirection: 'row', margin: 15 }}>
    <Image
      resizeMode={'cover'}
      style={{ width: 45, height: 32 }}
      source={{ uri: estado.bandeira }}
    />
    <Text
      style={{
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 2
      }}
    >
      {estado.estado}
    </Text>
  </View>
);

TitleEstadoComponent.propTypes = {
  estado: PropTypes.object
};

export default TitleEstadoComponent;
