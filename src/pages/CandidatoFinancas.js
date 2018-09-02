import React from 'react';
import { PricingCard } from 'react-native-elements';
import { Row, Grid  } from "react-native-easy-grid";

import Content from '../components/Content';

import { candidatoGasto } from '../services';
import { numeroParaReal } from '../constants';

export default class CandidatoFinancas extends React.Component {
    constructor(props) {
        super(props);

        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.props.navigation.state.params.candidato.nomeUrna
                });
            }
        );

        this.state = {
            candidato: props.navigation.state.params.candidato,
            gasto:{dadosConsolidados:{},despesas:{}},
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidatoGasto((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.cargo.codigo,(this.state.candidato.numero+"").substr(0, 2),this.state.candidato.numero,this.state.candidato.id);
        this.setState({gasto:result,loading:false});
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                <Grid>
                    <Row>
                        {
                            this.state.gasto.dadosConsolidados && (
                                <PricingCard
                                    containerStyle={{width:"90%"}}
                                    color='#43a047'
                                    title='Receitas'
                                    price={numeroParaReal(this.state.gasto.dadosConsolidados.totalRecebido)}
                                    info={['Pessoas Físicas: '+numeroParaReal(this.state.gasto.dadosConsolidados.totalReceitaPF), 'Partido: '+numeroParaReal(this.state.gasto.dadosConsolidados.totalPartidos)]}
                                    button={{ title: 'Lista de Receitas' }}
                                    />
                            )
                        }
                    </Row>
                    <Row>
                        {
                            this.state.gasto.despesas && (
                                <PricingCard
                                    containerStyle={{width:"92%"}}
                                    color='#f44336'
                                    title='Despesas'
                                    price={numeroParaReal(this.state.gasto.despesas.totalDespesasContratadas)}
                                    info={['Limite: '+numeroParaReal(this.state.gasto.despesas.valorLimiteDeGastos), 'Pagas: '+numeroParaReal(this.state.gasto.despesas.totalDespesasPagas)]}
                                    button={{ title: 'Lista de Despesas'}}
                                    />
                            )
                        }
                    </Row>
                </Grid>
            </Content>
        );
    }
}