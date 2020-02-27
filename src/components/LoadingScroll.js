import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import colors from '../core/colors';

const LoadingScrollComponent = ({ loading }) =>
  loading ? (
    <ActivityIndicator
      animating={true}
      size={30}
      color={colors.dark}
      style={{ padding: 10 }}
    />
  ) : (
    <View />
  );

LoadingScrollComponent.propTypes = {
  loading: PropTypes.bool
};

LoadingScrollComponent.defaultProps = {
  loading: false
};

export default LoadingScrollComponent;
