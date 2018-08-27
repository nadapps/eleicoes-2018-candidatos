import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image } from 'react-native';
import { ListItem } from 'react-native-elements';

import NumeroUrna from '../components/NumeroUrna';

import styles from '../styles';

class MeuCandidato extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem
                avatar={<Image style={{width:60,height:80}} source={this.props.candidato.fotoUrl!=null ? {uri:this.props.candidato.fotoUrl} : require("../../assets/img/user.png")}></Image>}
                title={<Text style={[styles.title,{paddingTop:0,fontSize:16}]}>{this.props.cargo}: {this.props.candidato.nomeUrna==null ? "Não Selecionado" : this.props.candidato.nomeUrna}</Text>}
                subtitle={<NumeroUrna numero={this.props.candidato.numero==null ? "  " : this.props.candidato.numero+""} />}
                hideChevron={true}
            />
        );
    }
}

MeuCandidato.propTypes = {
    candidato: PropTypes.object,
    cargo: PropTypes.string
}

MeuCandidato.defaultProps = {
    candidato:{},
    cargo: ""
}

export default MeuCandidato;