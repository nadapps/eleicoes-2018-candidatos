import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { StackActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Content from '../components/Content';
import TitleEstado from '../components/TitleEstado';

import { cargos } from '../services';
import colors from '../colors';

export default class Estado extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Cargos",
        headerLeft: 
            <TouchableOpacity onPress={() => {navigation.dispatch(StackActions.pop())} }>
                <MaterialCommunityIcons style={{marginLeft:20}} name="arrow-left" size={30} color={colors.white} />
            </TouchableOpacity>
    });

    constructor(props) {
        super(props);

        this.state = {
            estado: props.navigation.state.params.estado,
            cargos: [],
            loading: true
        };
    }

    async componentDidMount(){
        let result = await cargos(this.state.estado.estadoabrev);
        this.setState({cargos:result.cargos,loading:false});
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
                <TitleEstado estado={this.state.estado} />
                <List containerStyle={{marginTop:0}}>
                    {
                        this.state.cargos.map((l) => (
                        <ListItem
                            component={TouchableOpacity}
                            key={l.codigo+""}
                            title={l.nome}
                            onPress={() => this.openCandidatos(l)}
                        />
                        ))
                    }
                </List>
            </Content>
        );
    }
}