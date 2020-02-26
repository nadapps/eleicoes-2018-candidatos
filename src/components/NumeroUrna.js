import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import colors from '../core/colors';

class NumeroUrna extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={
          !this.props.style
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }
            : [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                this.props.style
              ]
        }
      >
        {this.props.numero.split('').map((numero, index) => (
          <Text
            key={index}
            style={{
              color: colors.black,
              fontWeight: 'bold',
              fontSize: this.props.fontSize,
              padding: this.props.padding - 2,
              paddingLeft: this.props.padding,
              paddingRight: this.props.padding,
              borderWidth: 0.5,
              borderColor: colors.black,
              marginLeft: this.props.padding - 2,
              backgroundColor: colors.white
            }}
          >
            {numero}
          </Text>
        ))}
      </View>
    );
  }
}

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
