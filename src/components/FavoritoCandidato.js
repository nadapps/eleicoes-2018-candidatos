import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../colors';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        return (
            <TouchableOpacity onPress={() => { } }>
                <MaterialIcons style={{marginRight:20}} name="star" size={30} color={colors.white} />
            </TouchableOpacity>
        );
  }
}