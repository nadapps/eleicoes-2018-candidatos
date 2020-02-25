import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Estado from '../pages/Estado';
import Candidatos from '../pages/Candidatos';
import ApuracaoCargos from '../pages/ApuracaoCargos';
import ApuracaoEstados from '../pages/ApuracaoEstados';
import Login from '../pages/Login';

import Home from '../pages/Home';
import Presidente from '../pages/Presidente';
import Governador from '../pages/Governador';
import Senador from '../pages/Senador';
import DeputadoFederal from '../pages/DeputadoFederal';
import DeputadoEstadual from '../pages/DeputadoEstadual';
import Estados from '../pages/Estados';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RoutesDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Presidente" component={Presidente} />
    <Drawer.Screen name="Governador" component={Governador} />
    <Drawer.Screen name="Senador" component={Senador} />
    <Drawer.Screen name="DeputadoFederal" component={DeputadoFederal} />
    <Drawer.Screen name="DeputadoEstadual" component={DeputadoEstadual} />
    <Drawer.Screen name="Estados" component={Estados} />
  </Drawer.Navigator>
);

const Routes = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={RoutesDrawer} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Candidatos" component={Candidatos} />
    <Stack.Screen name="Estado" component={Estado} />
    <Stack.Screen name="ApuracaoCargos" component={ApuracaoCargos} />
    <Stack.Screen name="ApuracaoEstados" component={ApuracaoEstados} />
  </Stack.Navigator>
);

export default Routes;
