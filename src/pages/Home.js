import React from 'react';
import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Content from '../components/Content';
import MeuCandidatoHome from '../components/MeuCandidatoHome';

import { getEstado, getCargo } from '../constants';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({ title: "Eleições 2018" });
                this.componentDidMount();
            }
        );

        this.state = {
            meupresidente: [],
            meugovernador: [],
            meusenador: [],
            meudeputadofederal: [],
            meudeputadoestadual: [],
            email:"",
            nome:"",
            estado:{},
        };
    }

    // async componentWillMount(){
    //     alert('teste');
    // }

    // async componentWillUnmount(){
    //     alert('teste1');
    // }

    async componentDidMount(){
        let emailStorage = await AsyncStorage.getItem('@Eleicoes2018:email');
        if(emailStorage==null){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
        }

        let email = await AsyncStorage.getItem('@Eleicoes2018:email');
        let nome = await AsyncStorage.getItem('@Eleicoes2018:nome');
        let estado = getEstado(await AsyncStorage.getItem('@Eleicoes2018:estado'));
        this.setState({email,nome,estado});

        let meupresidente = JSON.parse(await AsyncStorage.getItem('@Eleicoes2018:meupresidente'));
        if(meupresidente!=null) this.setState({meupresidente});

        let meugovernador = JSON.parse(await AsyncStorage.getItem('@Eleicoes2018:meugovernador'));
        if(meugovernador!=null) this.setState({meugovernador});
        
        let meusenador = JSON.parse(await AsyncStorage.getItem('@Eleicoes2018:meusenador'));
        if(meusenador!=null) this.setState({meusenador});
        
        let meudeputadofederal = JSON.parse(await AsyncStorage.getItem('@Eleicoes2018:meudeputadofederal'));
        if(meudeputadofederal!=null) this.setState({meudeputadofederal});
        
        let meudeputadoestadual = JSON.parse(await AsyncStorage.getItem('@Eleicoes2018:meudeputadoestadual'));
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
            <MeuCandidatoHome 
                titulo="Suas opções para Presidente"
                candidatos={this.state.meupresidente}
                cargo={{codigo:"1",nome:"Presidente"}}
                navigation={this.props.navigation}/>

            <MeuCandidatoHome
                titulo="Suas opções para Governador"
                estado={this.state.estado}
                candidatos={this.state.meugovernador}
                cargo={getCargo("Governador")}
                navigation={this.props.navigation}/>

            <MeuCandidatoHome
                titulo="Suas opções para Senador"
                estado={this.state.estado}
                candidatos={this.state.meusenador}
                cargo={getCargo("Senador")}
                navigation={this.props.navigation}/>

            <MeuCandidatoHome
                titulo="Suas opções para Deputado Federal"
                estado={this.state.estado}
                candidatos={this.state.meudeputadofederal}
                cargo={getCargo("Deputado Federal")}
                navigation={this.props.navigation}/>

            <MeuCandidatoHome
                titulo="Suas opções para Deputado Estadual"
                estado={this.state.estado} 
                last={true}
                candidatos={this.state.meudeputadoestadual} 
                cargo={getCargo("Deputado Estadual")}
                navigation={this.props.navigation}/>
        </Content>
        );
    }
}