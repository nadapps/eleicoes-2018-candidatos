import React from 'react';
import { Text } from 'react-native';
import Content from '../components/Content';

export default class Candidatos extends React.Component {
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
        
        };
    }

    render() {
        return (
            <Content>
                <Text>Candidatos</Text>
            </Content>
        );
    }
}