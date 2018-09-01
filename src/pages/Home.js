import React from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Row, Grid, Col  } from "react-native-easy-grid";
import { Card } from 'react-native-elements';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';
import ItemCandidato from '../components/ItemCandidato';

import { getEstado } from '../constants';
import styles from '../styles';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({ title: "Eleições 2018" });
            }
        );

        this.state = {
            meupresidente: {},
            meugovernador: {},
            meusenador: {},
            meudeputadofederal: {},
            meudeputadoestadual: {},
            email:"",
            nome:"",
            estado:"",
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

        let email = await AsyncStorage.getItem('@Eleicoes2018:email');
        let nome = await AsyncStorage.getItem('@Eleicoes2018:nome');
        let estado = await AsyncStorage.getItem('@Eleicoes2018:estado');
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
            <Text style={styles.titleSection}>Dados do Usuário</Text>
            <ItemCandidato title="Nome:" value={this.state.nome} />
            <ItemCandidato title="E-mail:" value={this.state.email} />

            <Text style={styles.titleSection}>Estado</Text>
            <TitleEstado estado={getEstado(this.state.estado)} />

            <Text style={styles.titleSection}>Meus Candidatos</Text>
            <View style={{padding:15}}>
            <Grid>
                <Row>
                    <Col>
                        <TouchableOpacity>
                            <Card
                                containerStyle={{margin:0}}
                                wrapperStyle={{padding:0}}
                                image={this.state.meupresidente.fotoUrl!=null ? {uri:this.state.meupresidente.fotoUrl} : require("../../assets/img/user.png")}>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card
                                containerStyle={{margin:0}}
                                wrapperStyle={{padding:0}}
                                image={this.state.meugovernador.fotoUrl!=null ? {uri:this.state.meugovernador.fotoUrl} : require("../../assets/img/user.png")}>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card
                                containerStyle={{margin:0}}
                                wrapperStyle={{padding:0}}
                                image={this.state.meusenador.fotoUrl!=null ? {uri:this.state.meusenador.fotoUrl} : require("../../assets/img/user.png")}>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card
                                containerStyle={{margin:0}}
                                wrapperStyle={{padding:0}}
                                image={this.state.meudeputadofederal.fotoUrl!=null ? {uri:this.state.meudeputadofederal.fotoUrl} : require("../../assets/img/user.png")}>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <TouchableOpacity>
                            <Card
                                containerStyle={{margin:0}}
                                wrapperStyle={{padding:0}}
                                image={this.state.meudeputadoestadual.fotoUrl!=null ? {uri:this.state.meudeputadoestadual.fotoUrl} : require("../../assets/img/user.png")}>
                            </Card>
                        </TouchableOpacity>
                    </Col>
                </Row>
            </Grid>
            </View>
        </Content>
        );
    }
}