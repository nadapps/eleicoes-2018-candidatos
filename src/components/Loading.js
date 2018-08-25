import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 10, borderRadius: 5 }}>
            <ActivityIndicator color="white" />
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}