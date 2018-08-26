import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import colors from '../colors';

class NumeroUrna extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={!this.props.style ? {flexDirection:'row',alignItems:'center',justifyContent:'center'} : [{flexDirection:'row',alignItems:'center',justifyContent:'center'},this.props.style]}>
                {
                    this.props.numero.split("").map((numero,index) => (
                        <Text key={index} style={
                            {   color:colors.black,
                                fontWeight:"bold",
                                fontSize:20,
                                padding: 8,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderWidth: 0.5,
                                borderColor: colors.black,
                                marginLeft: 8,
                            }}>{numero}</Text>
                    ))
                }
            </View>
        );
    }
}

NumeroUrna.propTypes = {
    numero: PropTypes.string,
    style: PropTypes.object
}

NumeroUrna.defaultProps = {
    numero: "00",
    style:{}
}

export default NumeroUrna;