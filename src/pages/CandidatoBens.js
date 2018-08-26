import React from 'react';
import { ListItem } from 'react-native-elements';

import Content from '../components/Content';

import { candidato } from '../services';

export default class CandidatoBens extends React.Component {
    constructor(props) {
        super(props);
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
                {
                    this.state.candidato.bens.map((l) => (
                    <ListItem
                        key={l.ordem+""}
                        title={l.descricaoDeTipoDeBem}
                        subtitle={"R$ "+l.valor}
                        hideChevron={true}
                    />
                    ))
                }
            </Content>
        );
    }
}