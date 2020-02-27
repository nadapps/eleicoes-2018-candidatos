import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { YellowBox } from 'react-native';

import Routes from './Routes';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const App = () => (
  <NavigationContainer>
    <Routes />
  </NavigationContainer>
);

export default App;
