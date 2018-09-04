import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableOpacity, TouchableNativeFeedback, Alert, AsyncStorage, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import { Row, Col } from "react-native-easy-grid";
import { StackActions } from 'react-navigation';

import styles from '../styles';
import colors from '../colors';

class MeuCandidatoHome extends Component {
    constructor(props) {
        super(props);
    }

    openCandidato = (candidato) => {
        candidato.cargo = this.props.cargo;
        if(this.props.estado!=null) candidato.ufCandidatura = this.props.estado.estadoabrev;
        else candidato.ufCandidatura = "BR";

        const resetAction = StackActions.push({
            index: 0,
            params: { candidato, estado:this.props.estado },
            routeName: 'CandidatoTab',
        });
        this.props.navigation.dispatch(resetAction);
    }

    openNoCandidato = () => {
        if(this.props.estado!=null){
            const resetAction = StackActions.push({
                index: 0,
                params: {estado:this.props.estado,cargo:this.props.cargo},
                routeName: 'Candidatos',
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            const resetAction = StackActions.push({
                index: 0,
                params: {},
                routeName: 'Presidente',
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    onRemoverCandidato = (candidato) => {
        Alert.alert(
            '',
            'Deseja Remover '+candidato.nomeUrna+'?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: async () => {
                    let data = this.props.candidatos;

                    for( let i=0; i<data.length; i++ ){
                        if(data[i].id==candidato.id) {
                            data.splice(i,1);
                            break;
                        }
                    }

                    if(this.props.cargo.nome=="Presidente") await AsyncStorage.setItem('@Eleicoes2018:meupresidente',JSON.stringify(data));
                    else if(this.props.cargo.nome=="Governador") await AsyncStorage.setItem('@Eleicoes2018:meugovernador',JSON.stringify(data));
                    else if(this.props.cargo.nome=="Senador") await AsyncStorage.setItem('@Eleicoes2018:meusenador',JSON.stringify(data));
                    else if(this.props.cargo.nome=="Deputado Federal") await AsyncStorage.setItem('@Eleicoes2018:meudeputadofederal',JSON.stringify(data));
                    else if(this.props.cargo.nome=="Deputado Estadual") await AsyncStorage.setItem('@Eleicoes2018:meudeputadoestadual',JSON.stringify(data));
                    ToastAndroid.show('Candidato removido dos Favoritos', ToastAndroid.SHORT);
                    
                    this.props.onRemove();
                }},
            ],
            { cancelable: false }
          )
          
    }

    render() {
        return (
            <Card 
                containerStyle={{marginBottom: (this.props.last ? 15 : 0), borderRadius: 15}}
                wrapperStyle={{paddingTop:0}} >
                <Row>
                    <Col><Text style={styles.titleMeuCandidato}>{this.props.titulo}</Text></Col>
                </Row>
                <Row>
                    {
                        [0,1,2].map((index) => (
                            <Col key={index}>
                                {
                                    this.props.candidatos[index]!=null && (
                                        <TouchableNativeFeedback
                                            onPress={() => this.openCandidato(this.props.candidatos[index])}
                                            onLongPress={() => this.onRemoverCandidato(this.props.candidatos[index])}>
                                            <Card
                                                containerStyle={{margin:5}}
                                                wrapperStyle={{padding:0}}
                                                image={{uri:this.props.candidatos[index].fotoUrl}} />
                                        </TouchableNativeFeedback>
                                    )
                                }
                                
                                {
                                    this.props.candidatos[index]==null && (
                                        <TouchableOpacity style={{zIndex:0}} onPress={() => this.openNoCandidato()}>
                                            <Card
                                                containerStyle={{margin:5}}
                                                wrapperStyle={{padding:0}}
                                                image={require("../../assets/img/img_selecione.png")} />
                                        </TouchableOpacity>
                                    )
                                }
                                {
                                    this.props.estado!=null && (
                                        <View style={{
                                            position:"absolute", 
                                            right:15, 
                                            bottom: 10, 
                                            width: 25, 
                                            height:18,
                                            zIndex:100
                                        }} >
                                        <Image
                                            source={{uri:this.props.estado.bandeira}}
                                            style={{
                                                width: 25, 
                                                height:18
                                            }} />
                                        </View>
                                    )
                                }
                                 <Text style={{position:"absolute", left:15, top: 10,fontWeight:"bold", fontSize: 15, color:colors.accent}}>{index+1}°</Text>
                            </Col>
                        ))
                    }
                    
                </Row>
            </Card>
        );
    }
}

MeuCandidatoHome.propTypes = {
    candidatos: PropTypes.array,
    titulo: PropTypes.string,
    last: PropTypes.bool,
    estado: PropTypes.object,
    navigation: PropTypes.any,
    cargo: PropTypes.object,
    onRemove: PropTypes.func
}

MeuCandidatoHome.defaultProps = {
    candidatos:{},
    titulo: "",
    last: false,
    estado: null,
    cargo: {}
}

export default MeuCandidatoHome;