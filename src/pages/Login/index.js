import React, { useState } from 'react';
import {
  Text,
  ToastAndroid,
  Picker,
  View,
  ImageBackground,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { Button } from 'react-native-elements';

import { estados } from '../../constants';
import Content from '../../components/Content';

import style from './Login.style';

const Login = ({ navigation }) => {
  const [estado, setEstado] = useState('');

  const entrar = async () => {
    if (estado !== '') {
      await AsyncStorage.setItem('@Eleicoes2018:estado', estado);
      await AsyncStorage.setItem(
        '@Eleicoes2018:deviceid',
        DeviceInfo.getDeviceId()
      );

      navigation.dispatch(StackActions.replace('Main'));
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
            containerStyle={style.buttonContainer}
            buttonStyle={style.button}
            raised
            titleStyle={style.textButton}
            onPress={() => entrar()}
            title="Acessar"
          />
        </View>
      </ImageBackground>
    </Content>
  );
};

export default Login;
