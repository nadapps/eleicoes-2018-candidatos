import React from 'react';
import { Image, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import Content from '../components/Content';
import { estados } from '../constants';
import { Card } from 'react-native-elements';
import { StackActions } from 'react-navigation';

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Eleições 2018'
    });

    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

    openEstado = estado => {
        const resetAction = StackActions.push({
            index: 0,
            params: {estado},
            routeName: 'Estado',
        });
        this.props.navigation.dispatch(resetAction);
    };
  
    renderItem = ({item}) => {
        return (
        <TouchableOpacity onPress={() => this.openEstado(item)}>
            <View style={{flex:1, width:Dimensions.get('window').width/2}}>
            <Card containerStyle={{padding:0}}>
                <Image resizeMode={'cover'} style={{width:"100%", height: 100}} source={{uri: item.bandeira}} />
            </Card>
            </View>
        </TouchableOpacity>
        );
    }

    render() {
        return (
        <Content>
            <FlatList
                numColumns={2}
                removeClippedSubviews={false}
                keyExtractor={(item) => item.estadoabrev }
                data={estados}
                renderItem={this.renderItem} />
        </Content>
        );
    }
}