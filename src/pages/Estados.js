import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Content from '../components/Content';
import { estados } from '../constants';
import { StackActions } from 'react-navigation';

export default class Estados extends React.Component {
    constructor(props) {
        super(props);

        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({ title: "Estados" });
            }
        );

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

    render() {
        return (
            <Content>
                <List containerStyle={{marginTop:0}}>
                    {
                        estados.map((l) => (
                            <ListItem
                                component={TouchableOpacity}
                                key={l.estadoabrev+""}
                                avatar = {<Image resizeMode="cover" style={{width:35,height:25}} source={{ uri: l.bandeira }}/>}
                                title={l.estado}
                                onPress={() => this.openEstado(l)}
                            />
                        ))
                    }
                </List>
            </Content>
        );
    }
}