import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import {
  createDrawerNavigator,
  useIsDrawerOpen
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getCargo } from '../../core/constants';

import Home from '../Home';
import Presidentes from '../Presidentes';
import Estados from '../Estados';

const Drawer = createDrawerNavigator();

const MenuScreen = ({ navigation }) => {
  const isDrawerOpen = useIsDrawerOpen();

  navigation.setOptions({
    headerLeft: () => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <View style={{ marginLeft: 20, borderRadius: 50 }}>
          {!isDrawerOpen ? (
            <MaterialCommunityIcons
              name="menu"
              size={30}
              color={colors.black}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              color={colors.black}
            />
          )}
        </View>
      </TouchableNativeFeedback>
    )
  });

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Presidentes" component={Presidentes} />
      <Drawer.Screen name="Governador" component={GovernadorScreen} />
      <Drawer.Screen name="Senador" component={SenadorScreen} />
      <Drawer.Screen name="DeputadoFederal" component={DeputadoFederalScreen} />
      <Drawer.Screen
        name="DeputadoEstadual"
        component={DeputadoEstadualScreen}
      />
      <Drawer.Screen
        name="Estados"
        component={Estados}
        options={{ headerTitle: 'Estados...' }}
      />
    </Drawer.Navigator>
  );
};

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

export default MenuScreen;
