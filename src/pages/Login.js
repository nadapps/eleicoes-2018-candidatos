import React from 'react';
import { Text, AsyncStorage, ToastAndroid, Picker, View, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { estados } from '../constants';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

import Content from '../components/Content';
import colors from '../colors';

export default class Login extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            estado: ""
        };
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    async entrar(){
        if(this.state.estado!=""){
            await AsyncStorage.setItem('@Eleicoes2018:estado', this.state.estado);
            await AsyncStorage.setItem('@Eleicoes2018:deviceid', DeviceInfo.getDeviceId());

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            ToastAndroid.show('Campos Obrigatórios', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <Content>
                <ImageBackground source={require('../../assets/img/bg-login.png')} imageStyle={{width:"100%", resizeMode:"stretch"}} style={{width: '100%', height: '100%'}}>
                    <View style={{margin:15}}>
                        <View style={{ flex:1, flexDirection:'row', justifyContent: 'center', marginTop: 40}}>
                            <Image
                                resizeMode="contain"
                                source={require('../../assets/img/bg-logo.png')}
                                style={{width:180,height:180, marginBottom:10, paddingTop:20}} />
                        </View>
                        <Text style={{color:"white", fontWeight:"bold", fontSize:18, textAlign:"center", padding:10, marginBottom:10, marginTop:10}}>Queremos saber apenas seu estado para facilitar a navegação</Text>
                            <View style={{height: 50, borderColor: 'white', borderWidth: 1, borderRadius:5, marginTop:20}}>
                                <Picker
                                    selectedValue={this.state.estado}
                                    style={{ color:"white"}}
                                    itemStyle={{ fontSize:40 }}
                                    onValueChange={(itemValue) => this.setState({estado: itemValue})}>
                                    <Picker.Item enabled={false} label="Escolha o Estado" value="" />
                                    {
                                        estados.map((estado) =>{
                                            return <Picker.Item key={estado.estadoabrev} label={estado.estado} value={estado.estadoabrev} />
                                        })
                                    }
                                </Picker>
                            </View>
                            <Button
                                containerViewStyle={{marginLeft:0, paddingLeft: 0, marginTop:30, width:"100%"}}
                                raised
                                backgroundColor={colors.primary}
                                color={colors.black}
                                onPress={() => this.entrar()}
                                title='Acessar' />
                    </View>
                </ImageBackground>
            </Content>
        );
    }
}