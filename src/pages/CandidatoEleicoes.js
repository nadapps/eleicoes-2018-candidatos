import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import Share from 'react-native-share';
import Entypo from 'react-native-vector-icons/Entypo';

import ContentCandidato from '../components/ContentCandidato';

import { candidato } from '../services';
import { coresPartidos } from '../constants';
import colors from '../colors';

export default class CandidatoEleicoes extends React.Component {
    constructor(props) {
        super(props);

        let backgroundColor = coresPartidos[this.props.navigation.state.params.candidato.partido.sigla.toLowerCase().replace(/\s+/g, "")];
        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.props.navigation.state.params.candidato.nome,
                    headerColor: backgroundColor,
                    headerRight: 
                        <TouchableOpacity onPress={() => { this.share() } }>
                            <Entypo name="share" size={25} color={colors.white} style={{marginRight:20, marginTop:2}} />
                        </TouchableOpacity>
                });
            }
        );

        this.state = {
            candidato: {
                id: props.navigation.state.params.candidato.id,
                partido: props.navigation.state.params.candidato.partido,
                eleicoesAnteriores: []
            },
            eleicoesAnteriores: [],
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);

        let eleicoesAnteriores = [];

        for(let i=0; i<result.eleicoesAnteriores.length; i++){
            eleicoesAnteriores.push({
                time: result.eleicoesAnteriores[i].nrAno,
                title: result.eleicoesAnteriores[i].cargo+" - "+result.eleicoesAnteriores[i].local,
                description: result.eleicoesAnteriores[i].partido,
            });
        }

        this.setState({candidato:result,loading:false,eleicoesAnteriores});
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

    render() {
        return (
            <ContentCandidato loading={this.state.loading} candidato={this.state.candidato}>
                <View style={{padding:15, paddingBottom: 0}}>
                    <Timeline
                        circleColor={colors.gray}
                        data={this.state.eleicoesAnteriores}
                        lineColor={colors.gray}
                        innerCircle={'dot'}
                        />
                </View>
            </ContentCandidato>
        );
    }
}