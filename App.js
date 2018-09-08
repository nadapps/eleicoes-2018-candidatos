import React from 'react';
import { AppRegistry, TouchableNativeFeedback, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerActions, createBottomTabNavigator, StackActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Estados from './src/pages/Estados';
import Presidente from './src/pages/Presidente';
import Governador from './src/pages/Governador';
import Senador from './src/pages/Senador';
import DeputadoFederal from './src/pages/DeputadoFederal';
import DeputadoEstadual from './src/pages/DeputadoEstadual';
import Estado from './src/pages/Estado';
import Home from './src/pages/Home';
import Candidatos from './src/pages/Candidatos';
import CandidatoDetalhe from './src/pages/CandidatoDetalhe';
import CandidatoBens from './src/pages/CandidatoBens';
import CandidatoEleicoes from './src/pages/CandidatoEleicoes';
import CandidatoFinancas from './src/pages/CandidatoFinancas';
import Login from './src/pages/Login';

import { APP_NAME } from './src/constants';
import colors from './src/colors.js';
import styles from './src/styles.js';

const MenuImage = ({navigation}) => {
  if(!navigation.state.isDrawerOpen){
      return <MaterialCommunityIcons name="menu" size={30} color={colors.black} />
  }else{
    return <MaterialCommunityIcons name="arrow-left" size={30} color={colors.black} />
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
  // MeusCandidatos: {
  //   screen: MeusCandidatos,
  //   navigationOptions:{
  //     drawerLabel: "Meus Candidatos",
  //     drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
  //   }
  // },
  Presidente: {
    screen: Presidente,
    navigationOptions:{
      drawerLabel: "Presidentes",
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
    }
  },
  Governador: {
    screen: Governador,
    navigationOptions:{
      drawerLabel: "Governadores",
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
    }
  },
  Senador: {
    screen: Senador,
    navigationOptions:{
      drawerLabel: "Senadores",
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
    }
  },
  DeputadosFederal: {
    screen: DeputadoFederal,
    navigationOptions:{
      drawerLabel: "Deputados Federais",
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={20} color={tintColor} />
    }
  },
  DeputadoEstadual: {
    screen: DeputadoEstadual,
    navigationOptions:{
      drawerLabel: "Deputados Estaduais",
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
  // Partidos: {
  //   screen: Partidos,
  //   navigationOptions:{
  //     drawerLabel: "Partidos",
  //     drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="panorama-wide-angle" size={20} color={tintColor} />
  //   }
  // },
},{
  initialRouteName: 'Home',
  drawerWidth: 300,
  contentOptions: {
    activeTintColor: colors.accent
  }
});

MainTab.navigationOptions = ({ navigation }) => {
  if(navigation.state.routes[navigation.state.index].params!=null){
    let headerTitle = navigation.state.routes[navigation.state.index].params.title;
  
    return {
      headerTitle
    };
  } else {
    return {
      headerTitle: APP_NAME
    };
  }
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
      activeTintColor: colors.grey,
      inactiveTintColor: colors.gray,
      style: [styles.tabBar, styles.shadowTop],
      indicatorStyle: {
        backgroundColor: colors.primary,
        top: 1
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
  let headerTitle = navigation.state.routes[navigation.state.index].params.title;
  let headerRight = navigation.state.routes[navigation.state.index].params.headerRight;
  let headerColor = navigation.state.routes[navigation.state.index].params.headerColor;

  if(!headerColor) headerColor = colors.primary;

  return {
    headerTitle,
    headerRight,
    headerStyle: {
      backgroundColor: headerColor,
      elevation: 0,
      shadowColor: 'transparent'
    },
    headerTitleStyle: {
      width:"70%"
    },
    headerTintColor: colors.white,
  };
};

const Stack = createStackNavigator(
  {
    Estado: { screen: Estado },
    Candidatos: { screen: Candidatos },
    Presidente: { screen: Presidente },
    Login: { screen: Login },
    CandidatoTab: { 
      screen: CandidatoTab
    },
    Main: {
      screen: MainTab,
      navigationOptions: ({ navigation }) => ({
        title: APP_NAME,
        headerLeft: 
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <View style={{marginLeft:20,borderRadius:50}} >
              <MenuImage navigation={navigation}/>
            </View>
          </TouchableNativeFeedback>,
      })
    },
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      title: APP_NAME,
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowColor: 'transparent'
      },
      cardStyle: {
        shadowColor: 'transparent',
       },
      headerTintColor: colors.black,
    }
  }
);

export default Stack;

AppRegistry.registerComponent('Eleicoes2018', () => Stack);