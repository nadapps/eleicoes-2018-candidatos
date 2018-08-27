import React from 'react';
import { AsyncStorage, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Card } from 'react-native-elements';

import Content from '../components/Content';

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Eleições 2018'
    });

    constructor(props) {
        super(props);

        this.state = {
            meupresidente: {},
            meugovernador: {},
            meusenador: {},
            meudeputadofederal: {},
            meudeputadoestadual: {}
        };
    }

    async componentDidMount(){
        let emailStorage = await AsyncStorage.getItem('@Eleicoes2018:email');
        if(emailStorage==null){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
        let meupresidente = await AsyncStorage.getItem('@Eleicoes2018:meupresidente');
        if(meupresidente!=null) this.setState({meupresidente});
        
        let meugovernador = await AsyncStorage.getItem('@Eleicoes2018:meugovernador');
        if(meugovernador!=null) this.setState({meugovernador});
        
        let meusenador = await AsyncStorage.getItem('@Eleicoes2018:meusenador');
        if(meusenador!=null) this.setState({meusenador});
        
        let meudeputadofederal = await AsyncStorage.getItem('@Eleicoes2018:meudeputadofederal');
        if(meudeputadofederal!=null) this.setState({meudeputadofederal});
        
        let meudeputadoestadual = await AsyncStorage.getItem('@Eleicoes2018:meudeputadoestadual');
        if(meudeputadoestadual!=null) this.setState({meudeputadoestadual});
    }

    openEstado = estado => {
        const resetAction = StackActions.push({
            index: 0,
            params: {estado},
            routeName: 'Estado',
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
        <Content>
            <Text></Text>
        </Content>
        );
    }
}