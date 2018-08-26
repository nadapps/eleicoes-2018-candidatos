import React from 'react';
import { AppRegistry, TouchableOpacity, AsyncStorage } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerActions, createBottomTabNavigator, StackActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Favoritos from './src/pages/Favoritos';
import Estados from './src/pages/Estados';
import Presidente from './src/pages/Presidente';
import Partidos from './src/pages/Partidos';
import Estado from './src/pages/Estado';
import Home from './src/pages/Home';
import Candidatos from './src/pages/Candidatos';
import CandidatoDetalhe from './src/pages/CandidatoDetalhe';
import CandidatoBens from './src/pages/CandidatoBens';
import CandidatoEleicoes from './src/pages/CandidatoEleicoes';
import CandidatoFinancas from './src/pages/CandidatoFinancas';
import Login from './src/pages/Login';
import MeusCandidatos from './src/pages/MeusCandidatos';

import { APP_NAME } from './src/constants';
import colors from './src/colors.js';
import styles from './src/styles.js';

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
      drawerLabel: "Início",
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="home" size={20} color={tintColor} />
    }
  },
  Presidente: {
    screen: Presidente,
    navigationOptions:{
      drawerLabel: "Presidente",
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
    }
  },
  MeusCandidatos: {
    screen: MeusCandidatos,
    navigationOptions:{
      drawerLabel: "Meus Candidatos",
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
    }
  },
  Estados: {
    screen: Estados,
    navigationOptions:{
      drawerLabel: "Estados",
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="map" size={20} color={tintColor} />
    }
  },
  Partidos: {
    screen: Partidos,
    navigationOptions:{
      drawerLabel: "Partidos",
      drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="panorama-wide-angle" size={20} color={tintColor} />
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

MainTab.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  let headerTitle = routeName;

  return {
    headerTitle,
  };
};

const CandidatoTab = createBottomTabNavigator(
  {
    Descrição: {
      screen: CandidatoDetalhe,
      navigationOptions:{
        tabBarLabel: "Candidato",
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="person" size={30} color={tintColor} />
      }
    },
    Bens: {
      screen: CandidatoBens,
      navigationOptions:{
        tabBarLabel: "Bens",
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="attach-money" size={30} color={tintColor} />
      }
    },
    Candidaturas: {
      screen: CandidatoEleicoes,
      navigationOptions:{
        tabBarLabel: "Candidaturas",
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="star" size={30} color={tintColor} />
      }
    },
    Finanças: {
      screen: CandidatoFinancas,
      navigationOptions:{
        tabBarLabel: "Finanças",
        tabBarIcon: ({ tintColor }) => <FontAwesome5 name="coins" size={22} color={tintColor} />
      }
    },
  },{
    lazy: true,
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.black,
      style: [styles.tabBar, styles.shadowTop],
      indicatorStyle: {
        backgroundColor: colors.primary,
        top: 0
      },
      labelStyle: {
        fontSize: 10,
        marginTop: 0,
        marginBottom: 0
      },
      iconStyle: {
        marginBottom: 0,
        marginTop: 0
      }
    }
  }
);

CandidatoTab.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  let headerTitle = routeName;

  return {
    headerTitle,
  };
};

const Stack = createStackNavigator(
  {
    Estado: { screen: Estado },
    Candidatos: { screen: Candidatos },
    Login: { screen: Login },
    CandidatoTab: { 
      screen: CandidatoTab,
      navigationOptions: ({ navigation }) => ({
        headerLeft: 
          <TouchableOpacity onPress={() => {navigation.dispatch(StackActions.pop())} }>
              <MaterialCommunityIcons style={{marginLeft:20}} name="arrow-left" size={30} color={colors.white} />
          </TouchableOpacity>
      })
    },
    Main: {
      screen: MainTab,
      navigationOptions: ({ navigation }) => ({
        title: APP_NAME,
        headerLeft: 
          <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
              <MenuImage navigation={navigation}/>
          </TouchableOpacity>,
      })
    },
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      title: 'Eleições 2018',
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff'
    }
  }
);

export default Stack;

AppRegistry.registerComponent('Eleicoes2018', () => Stack);