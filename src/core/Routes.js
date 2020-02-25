import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { getCargo } from '../constants';

import Estado from '../pages/Estado';
import Candidatos from '../pages/Candidatos';
import Login from '../pages/Login';

import Home from '../pages/Home';
import Presidente from '../pages/Presidente';
import Estados from '../pages/Estados';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RoutesDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Presidente" component={Presidente} />
    <Drawer.Screen
      name="Governador"
      component={props => (
        <Estados
          cargo={getCargo('Governador')}
          title="Escolha o estado do Governador..."
          {...props}
        />
      )}
    />
    <Drawer.Screen
      name="Senador"
      component={props => (
        <Estados
          cargo={getCargo('Senador')}
          title="Escolha o estado do Senador..."
          {...props}
        />
      )}
    />
    <Drawer.Screen
      name="DeputadoFederal"
      component={props => (
        <Estados
          cargo={getCargo('Deputado Federal')}
          title="Escolha o estado do Deputado..."
          {...props}
        />
      )}
    />
    <Drawer.Screen
      name="DeputadoEstadual"
      component={props => (
        <Estados
          cargo={getCargo('Deputado Estadual')}
          title="Escolha o estado do Deputado..."
          {...props}
        />
      )}
    />
    <Drawer.Screen name="Estados" component={Estados} />
  </Drawer.Navigator>
);

const Routes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Main"
      component={RoutesDrawer}
      options={{ headerTitle: 'Eleições 2018' }}
    />
    <Stack.Screen name="Candidatos" component={Candidatos} />
    <Stack.Screen
      name="Estado"
      component={Estado}
      options={{ headerTitle: 'Escolhar o Cargo...' }}
    />
  </Stack.Navigator>
);

export default Routes;
