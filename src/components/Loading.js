import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

const LoadingComponent = ({ loading }) =>
  loading ? (
    <View style={style.root}>
      <View style={style.content}>
        <ActivityIndicator color="white" />
      </View>
    </View>
  ) : (
    <View />
  );

const style = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderRadius: 5
  }
};

LoadingComponent.propTypes = {
  loading: PropTypes.bool
};

LoadingComponent.defaultProps = {
  loading: false
};

export default LoadingComponent;
