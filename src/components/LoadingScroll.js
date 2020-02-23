import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../colors';

export default class LoadingScroll extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return (
        <ActivityIndicator
          animating={true}
          size={30}
          color={colors.dark}
          style={{ padding: 10 }}
        />
      );
    } else {
      return <View />;
    }
  }
}
