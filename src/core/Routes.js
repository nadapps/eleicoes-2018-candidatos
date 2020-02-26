import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getCargo } from '../core/constants';
import style from './styles';

import Estado from '../screens/Estado';
import Candidatos from '../screens/Candidatos';
import Login from '../screens/Login';

import Home from '../screens/Home';
import Presidentes from '../screens/Presidentes';
import Estados from '../screens/Estados';

import CandidatoDetalhe from '../screens/CandidatoDetalhe';
import CandidatoBens from '../screens/CandidatoBens';
import CandidatoEleicoes from '../screens/CandidatoEleicoes';
import CandidatoFinancas from '../screens/CandidatoFinancas';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const RoutesDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Presidentes" component={Presidentes} />
    <Drawer.Screen name="Governador" component={GovernadorScreen} />
    <Drawer.Screen name="Senador" component={SenadorScreen} />
    <Drawer.Screen name="DeputadoFederal" component={DeputadoFederalScreen} />
    <Drawer.Screen name="DeputadoEstadual" component={DeputadoEstadualScreen} />
    <Drawer.Screen
      name="Estados"
      component={Estados}
      options={{ headerTitle: 'Estados...' }}
    />
  </Drawer.Navigator>
);

const RoutesTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="CandidatoDetalhe" component={CandidatoDetalhe} />
    <Tab.Screen name="CandidatoBens" component={CandidatoBens} />
    <Tab.Screen name="CandidatoEleicoes" component={CandidatoEleicoes} />
    <Tab.Screen name="CandidatoFinancas" component={CandidatoFinancas} />
  </Tab.Navigator>
);

const Routes = () => (
  <Stack.Navigator screenOptions={{ headerStyle: style.header }}>
    <Stack.Screen
      name="Main"
      component={RoutesDrawer}
      options={{ headerTitle: 'Eleições 2018' }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ header: () => null }}
    />
    <Stack.Screen name="Candidatos" component={Candidatos} />
    <Stack.Screen
      name="Estado"
      component={Estado}
      options={{ headerTitle: 'Escolhar o Cargo...' }}
    />
    <Stack.Screen name="Candidato" component={RoutesTab} />
  </Stack.Navigator>
);

const GovernadorScreen = props => (
  <Estados
    cargo={getCargo('Governador')}
    title="Escolha o estado do Governador..."
    {...props}
  />
);

const SenadorScreen = props => (
  <Estados
    cargo={getCargo('Senador')}
    title="Escolha o estado do Senador..."
    {...props}
  />
);

const DeputadoFederalScreen = props => (
  <Estados
    cargo={getCargo('Deputado Federal')}
    title="Escolha o estado do Deputado..."
    {...props}
  />
);

const DeputadoEstadualScreen = props => (
  <Estados
    cargo={getCargo('Deputado Estadual')}
    title="Escolha o estado do Deputado..."
    {...props}
  />
);

export default Routes;
