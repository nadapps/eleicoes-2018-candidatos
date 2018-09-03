import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import ContentCandidato from '../components/ContentCandidato';

import { candidato } from '../services';
import { numeroParaReal, coresPartidos } from '../constants';
import styles from '../styles';

export default class CandidatoBens extends React.Component {
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
                bens: []
            },
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);
        this.setState({candidato:result,loading:false});
    }

    render() {
        return (
            <ContentCandidato loading={this.state.loading} candidato={this.state.candidato}>
                <Text style={styles.titleSection}>Total de Bens: {numeroParaReal(this.state.candidato.totalDeBens)}</Text>
                {
                    this.state.candidato.bens.map((l, index) => (
                        <ListItem
                            key={l.ordem+""}
                            containerStyle={index==this.state.candidato.bens.length-1 ? {borderBottomWidth: 0} : {}}
                            title={l.descricaoDeTipoDeBem}
                            subtitle={numeroParaReal(l.valor)}
                            hideChevron={true}
                        />
                    ))
                }
            </ContentCandidato>
        );
    }
}