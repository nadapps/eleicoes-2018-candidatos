import React from 'react';
import { View } from 'react-native';
import Timeline from 'react-native-timeline-listview'

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
                    title: this.props.navigation.state.params.candidato.nomeUrna,
                    headerColor: backgroundColor
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