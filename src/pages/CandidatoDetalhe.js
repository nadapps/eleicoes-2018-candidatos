import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Col, Row } from "react-native-easy-grid";
import Share from 'react-native-share';
import Entypo from 'react-native-vector-icons/Entypo';

import ContentCandidato from '../components/ContentCandidato';
import NumeroUrna from '../components/NumeroUrna';
import RedesSociais from '../components/RedesSociais';
import ItemCandidato from '../components/ItemCandidato';
import FavoritoCandidato from '../components/FavoritoCandidato';

import { candidato } from '../services';
import styles from '../styles';
import colors from '../colors';
import { coresPartidos } from '../constants';

export default class CandidatoDetalhe extends React.Component {
    constructor(props) {
        super(props);

        let backgroundColor = coresPartidos[this.props.navigation.state.params.candidato.partido.sigla.toLowerCase().replace(/\s+/g, "")];
        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.props.navigation.state.params.candidato.nomeUrna,
                    headerColor: backgroundColor,
                    headerRight: 
                        <View style={{flexDirection:'row'}}>
                            <FavoritoCandidato candidato={this.props.navigation.state.params.candidato} />
                            <TouchableOpacity onPress={() => { this.share() } }>
                                <Entypo name="share" size={25} color={colors.white} style={{marginRight:20, marginTop:2}} />
                            </TouchableOpacity>
                        </View>
                    
                });
            }
        );

        this.state = {
            candidato: {
                id: props.navigation.state.params.candidato.id,
                sites: [],
                partido: props.navigation.state.params.candidato.partido,
                numero:"",
                dataDeNascimento:"",
                vices: [],
            },
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    share = () => {
        let mensagem = "Veja tudo sobre "+this.state.candidato.nomeUrna;
        mensagem += this.state.candidato.descricaoSexo=="FEM." ? ", candidata a " : ", candidato a ";
        mensagem += this.state.candidato.cargo.nome;
        mensagem += this.state.estado ? " pelo estado de "+this.state.estado.estado : " pelo Brasil"
        Share.open({
            title: "Eleições 2018",
            message: mensagem,
            url: ". Acesse http://goo.gl/VB5zB6.",
            subject: "Compartilhar Candidato"
        })
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }

    async componentDidMount(){
        let result = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);
        if(result.vices==null) result.vices = [];
        
        let redes = [];
        for(let i=0; i<result.sites.length; i++){
            let contain = false;
            for(let j=0; j<redes.length; j++){
                if(result.sites[i].includes("facebook") && redes[j].includes("facebook"))
                    contain = true;
                if(result.sites[i].includes("instagram") && redes[j].includes("instagram"))
                    contain = true;
                if(result.sites[i].includes("youtube") && redes[j].includes("youtube"))
                    contain = true;
                if(result.sites[i].includes("twitter") && redes[j].includes("twitter"))
                    contain = true;
                if(result.sites[i].includes("flickr") && redes[j].includes("flickr"))
                    contain = true;
            }

            if(!contain) redes.push(result.sites[i])
        }
        result.sites = redes;
        
        this.setState({candidato:result,loading:false});
    }


    render() {
        return (
            <ContentCandidato loading={this.state.loading} candidato={this.state.candidato}>
                <Row>
                    <Col>
                        <Text style={[styles.title]}>{this.state.candidato.nomeUrna}</Text>
                        <NumeroUrna style={{paddingTop: 5, paddingBottom: 0}} numero={this.state.candidato.numero+""} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={styles.line}></View>
                        <Text style={styles.titleSection}>Redes Sociais</Text>
                        <RedesSociais redes={this.state.candidato.sites} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <View style={styles.line}></View>
                        <Text style={styles.titleSection}>Dados do Candidato</Text>
                        <ItemCandidato title="Nome Completo:" value={this.state.candidato.nomeCompleto} />
                        <ItemCandidato title="Ocupação:" value={this.state.candidato.ocupacao} />
                        <ItemCandidato title="Sexo:" value={this.state.candidato.descricaoSexo  } />
                        <ItemCandidato title="Nascimento:" value={this.state.candidato.dataDeNascimento.split('-').reverse().join('/')} />
                        <ItemCandidato title="Coligação:" value={this.state.candidato.nomeColigacao} />
                        <ItemCandidato title="Partidos:" value={this.state.candidato.composicaoColigacao} />
                    </Col>
                </Row>
                {
                    this.state.candidato.vices.length>0 && (
                        <View>
                            <Row>
                                <Col>
                                    <Text style={styles.titleSection}>Vice</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={30}>
                                    <Image style={styles.imageViceCandidato} source={{uri:this.state.candidato.vices[0].urlFoto}} />
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.titleVice}>{this.state.candidato.vices[0].nm_URNA}</Text>
                                    <Text style={styles.subtitle}>{this.state.candidato.vices[0].sg_PARTIDO}</Text>
                                </Col>
                            </Row>
                        </View>
                    )
                }
            </ContentCandidato>
        );
    }
}