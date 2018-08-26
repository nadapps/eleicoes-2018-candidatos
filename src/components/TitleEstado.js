import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import colors from '../colors';

export default class TitleEstado extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection:'row', margin:15}}>
                <Image resizeMode={'cover'} style={{width:45, height: 32}} source={{uri: this.props.estado.bandeira}} />
                <Text style={{color:colors.dark,fontWeight:"bold", fontSize:20, marginLeft:10,marginTop:2}}>{this.props.estado.estado}</Text>
            </View>
        );
    }
}