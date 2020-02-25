import React, { useState } from 'react';
import {
  Text,
  AsyncStorage,
  ToastAndroid,
  Picker,
  View,
  ImageBackground,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/core';
import { estados } from '../../constants';
import DeviceInfo from 'react-native-device-info';

import Content from '../../components/Content';
import colors from '../../colors';
import style from './Login.style';

const Login = ({ navigation }) => {
  const [estado, setEstado] = useState('');

  const entrar = async () => {
    if (estado != '') {
      await AsyncStorage.setItem('@Eleicoes2018:estado', estado);
      await AsyncStorage.setItem(
        '@Eleicoes2018:deviceid',
        DeviceInfo.getDeviceId()
      );

      const resetAction = StackActions.reset({
        index: 0,
        actions: [CommonActions.navigate({ routeName: 'Main' })]
      });
      navigation.dispatch(resetAction);
    } else {
      ToastAndroid.show('Campos Obrigatórios', ToastAndroid.SHORT);
    }
  };

  return (
    <Content>
      <ImageBackground
        source={require('../../assets/img/bg-login.png')}
        imageStyle={style.background}
        style={style.container}
      >
        <View style={{ margin: 15 }}>
          <View style={style.root}>
            <Image
              resizeMode="contain"
              source={require('../../assets/img/bg-logo.png')}
              style={style.logo}
            />
          </View>
          <Text style={style.description}>
            Queremos saber apenas seu estado para facilitar a navegação
          </Text>
          <View style={style.picker}>
            <Picker
              selectedValue={estado}
              style={{ color: 'white' }}
              itemStyle={{ fontSize: 40 }}
              onValueChange={itemValue => setEstado(itemValue)}
            >
              <Picker.Item enabled={false} label="Escolha o Estado" value="" />
              {estados.map(estado => (
                <Picker.Item
                  key={estado.estadoabrev}
                  label={estado.estado}
                  value={estado.estadoabrev}
                />
              ))}
            </Picker>
          </View>
          <Button
            containerViewStyle={style.button}
            raised
            backgroundColor={colors.primary}
            color={colors.black}
            onPress={() => entrar()}
            title="Acessar"
          />
        </View>
      </ImageBackground>
    </Content>
  );
};

export default Login;
