import React from 'react';
import { ListItem, Card } from 'react-native-elements';

import Content from '../components/Content';

import { candidato } from '../services';
import { numeroParaReal } from '../constants';
import styles from '../styles';

export default class CandidatoBens extends React.Component {
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
            candidato: {
                id: props.navigation.state.params.candidato.id,
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
            <Content loading={this.state.loading}>
                <Card containerStyle={styles.card}>
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
                </Card>
            </Content>
        );
    }
}