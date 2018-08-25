import React from 'react';
import { Text, TouchableOpacity, FlatList, View } from 'react-native';
import { StackActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Content from '../components/Content';

import { cargos } from '../services';
import colors from '../colors';
import styles from '../styles';

export default class Estado extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.estado.estado,
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

    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.openCandidatos(item)}>
                <View style={styles.itemList}>
                    <View style={styles.itemListIntern}>
                        <Text style={styles.itemListArrowText}>{item.nome}</Text>
                        <SimpleLineIcons style={styles.itemListArrow} name="arrow-right" size={15} color={colors.black} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                <FlatList
                    keyExtractor={(item) => item.codigo+"" }
                    data={this.state.cargos}
                    renderItem={this.renderItem} />
            </Content>
        );
    }
}