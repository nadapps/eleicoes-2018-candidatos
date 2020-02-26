import React, { Component } from 'react';
import { DrawerActions } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/core';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import styles from '../core/styles';

class DrawerScreen extends Component {
  navigateToScreen = route => () => {
    const navigateAction = CommonActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Home')}>Home</Text>
            </View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Nacional')}>Nacional</Text>
            </View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Estados')}>Estados</Text>
            </View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Favoritos')}>Estados</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;
