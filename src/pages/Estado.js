import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';

import { cargos } from '../constants';
import styles from '../styles';

export default class Estado extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Escolhar o Cargo..."
    });

    constructor(props) {
        super(props);

        this.state = {
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        this.setState({loading:false});
    }

    openCandidatos = cargo => {
        const resetAction = StackActions.push({
            index: 0,
            params: {estado:this.state.estado,cargo},
            routeName: 'Candidatos',
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                <Card containerStyle={{padding:0}}>
                    <TitleEstado estado={this.state.estado} />
                </Card>
                <Card containerStyle={styles.card}>
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