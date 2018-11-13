import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';

import { cargos } from '../constants';
import styles from '../styles';

export default class ApuracaoCargos extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    title: "Escolhar o Cargo da Apuração..."
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    async componentDidMount(){
        this.setState({loading:false});
    }

    openCandidatos = cargo => {
        const resetAction = StackActions.push({
            index: 0,
            params: {cargo},
            routeName: 'ApuracaoEstados',
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                <Card containerStyle={styles.card}>
                    <ListItem
                        component={TouchableOpacity}
                        key={"1"}
                        title={"Presidente"}
                        onPress={() => this.openCandidatos({   
                            "codigo": 1,
                            "nome": "Presidente"
                        })}
                    />
                    {
                        cargos.map((l,index) => (
                            <ListItem
                                component={TouchableOpacity}
                                key={l.codigo+""}
                                title={l.nome}
                                containerStyle={[index==cargos.length-1 ? {borderBottomWidth: 0} : {}]}
                                onPress={() => this.openCandidatos(l)}
                            />
                        ))
                    }
                </Card>
            </Content>
        );
    }
}