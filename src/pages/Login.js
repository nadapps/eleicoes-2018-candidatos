import React from 'react';
import { TextInput, Text, AsyncStorage, ToastAndroid, Picker, View } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { estados } from '../constants';

import Content from '../components/Content';
import colors from '../colors';

export default class Login extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nome: "",
            estado: ""
        };
    }

    async entrar(){
        if(this.state.email!="" && this.state.nome!="" && this.state.estados!=""){
            await AsyncStorage.setItem('@Eleicoes2018:email', this.state.email);
            await AsyncStorage.setItem('@Eleicoes2018:nome', this.state.home);
            await AsyncStorage.setItem('@Eleicoes2018:estado', this.state.estado);

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
            <Content style={{backgroundColor:colors.primary, padding:20}}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:30, textAlign:"center", padding:10, marginBottom:40, marginTop:40}}>Bem Vindo ao aplicativo Eleições 2018 !!!</Text>
                <TextInput
                    placeholder="Nome"
                    placeholderTextColor="white"
                    style={{height: 50, borderColor: 'white', borderWidth: 1, borderRadius:5, color:"white", fontSize:16, padding: 10}}
                    onChangeText={(nome) => this.setState({nome})}
                    underlineColorAndroid='transparent'
                    value={this.state.nome}
                />
                <TextInput
                    textContentType="emailAddress"
                    placeholder="E-mail"
                    placeholderTextColor="white"
                    style={{height: 50, borderColor: 'white', borderWidth: 1, borderRadius:5, marginTop:20, color:"white", fontSize:16, padding: 10}}
                    onChangeText={(email) => this.setState({email})}
                    underlineColorAndroid='transparent'
                    value={this.state.email}
                />
                <View style={{height: 50, borderColor: 'white', borderWidth: 1, borderRadius:5, marginTop:20}}>
                    <Picker
                        selectedValue={this.state.estado}
                        style={{ color:"white"}}
                        itemStyle={{ fontSize:40 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({estado: itemValue})}>
                        <Picker.Item enabled={false} label="Escolha o Estado" value="" />
                        {
                            estados.map((estado) =>{
                                return <Picker.Item key={estado.estadoabrev} label={estado.estado} value={estado.estadoabrev} />
                            })
                        }
                    </Picker>
                </View>
                <Button
                    containerViewStyle={{marginLeft:0, paddingLeft: 0, marginTop:20, width:"100%"}}
                    raised
                    backgroundColor={colors.white}
                    color={colors.black}
                    onPress={() => this.entrar()}
                    title='Entrar' />
            </Content>
        );
    }
}