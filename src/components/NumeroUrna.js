import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import colors from '../core/colors';

const NumeroUrna = ({ style, numero, fontSize, padding }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}
  >
    {numero.split('').map((numero, index) => (
      <Text
        key={index}
        style={{
          color: colors.black,
          fontWeight: 'bold',
          fontSize: fontSize,
          padding: padding - 2,
          paddingLeft: padding,
          paddingRight: padding,
          borderWidth: 0.5,
          borderColor: colors.black,
          marginLeft: padding - 2,
          backgroundColor: colors.white
        }}
      >
        {numero}
      </Text>
    ))}
  </View>
);

NumeroUrna.propTypes = {
  numero: PropTypes.string,
  style: PropTypes.object,
  fontSize: PropTypes.number,
  padding: PropTypes.number
};

NumeroUrna.defaultProps = {
  numero: '00',
  style: {},
  fontSize: 20,
  padding: 10
};

export default NumeroUrna;
