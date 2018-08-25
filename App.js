import React from 'react';
import { AppRegistry, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Favoritos from './src/pages/Favoritos';
import Estados from './src/pages/Estados';
import Home from './src/pages/Home';

import { APP_NAME } from './src/constants';
import colors from './src/colors.js';
import DrawerScreen from './src/components/DrawerScreen';

const MenuImage = ({navigation}) => {
  if(!navigation.state.isDrawerOpen){
      return <MaterialCommunityIcons style={{marginLeft:20}} name="menu" size={30} color={colors.white} />
  }else{
    return <MaterialCommunityIcons style={{marginLeft:20}} name="arrow-left" size={30} color={colors.white} />
  }
}

const MainTab = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      drawerLabel: "Home",
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="home" size={20} color={tintColor} />
    }
  },
  Estados: {
    screen: Estados,
    navigationOptions:{
      drawerLabel: "Estados",
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="map" size={20} color={tintColor} />
    }
  },
  Favoritos: {
    screen: Favoritos,
    navigationOptions:{
      drawerLabel: "Favoritos",
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="star" size={20} color={tintColor} />
    }
  },
},{
  initialRouteName: 'Home',
  drawerWidth: 300
});

const Stack = createStackNavigator(
  {
    Main: {
      screen: MainTab,
      navigationOptions: {
        title: APP_NAME
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: 'ReactNavigation',  // Title to appear in status bar
      headerLeft: 
      <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <MenuImage style="styles.bar" navigation={navigation}/>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff'
    })
  }
);

export default Stack;

AppRegistry.registerComponent('Eleicoes2018', () => Stack);