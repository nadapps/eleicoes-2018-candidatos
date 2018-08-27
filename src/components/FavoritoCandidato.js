import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, ToastAndroid, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../colors';

export default class FavoritoCandidato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon:"star-border",
      visible:false
    }

    this.star();
  }

  async star() {
    let estado = await AsyncStorage.getItem('@Eleicoes2018:estado');
    
    if(this.props.candidato.ufCandidatura.toLowerCase()===estado.toLowerCase() ||
        this.props.candidato.ufCandidatura.toLowerCase()==="br"){
      
      let data = {};
      if(this.props.candidato.cargo.nome=="Presidente") data = await AsyncStorage.getItem('@Eleicoes2018:meupresidente');
      else if(this.props.candidato.cargo.nome=="Governador") data = await AsyncStorage.getItem('@Eleicoes2018:meugovernador');
      else if(this.props.candidato.cargo.nome=="Senador") data = await AsyncStorage.getItem('@Eleicoes2018:meusenador');
      else if(this.props.candidato.cargo.nome=="Deputado Federal") data = await AsyncStorage.getItem('@Eleicoes2018:meudeputadofederal');
      else if(this.props.candidato.cargo.nome=="Deputado Estadual") data = await AsyncStorage.getItem('@Eleicoes2018:meudeputadoestadual');
      
      if(data!=null) data = JSON.parse(data);
      
      if(data!=null && data.id==this.props.candidato.id){
        this.setState({icon:"star"});
      }
      this.setState({visible:true});
    }
  }

  async onPress(){
    if(this.state.icon=="star") {

      if(this.props.candidato.cargo.nome=="Presidente") await AsyncStorage.removeItem('@Eleicoes2018:meupresidente');
      else if(this.props.candidato.cargo.nome=="Governador") await AsyncStorage.removeItem('@Eleicoes2018:meugovernador');
      else if(this.props.candidato.cargo.nome=="Senador") await AsyncStorage.removeItem('@Eleicoes2018:meusenador');
      else if(this.props.candidato.cargo.nome=="Deputado Federal") await AsyncStorage.removeItem('@Eleicoes2018:meudeputadofederal');
      else if(this.props.candidato.cargo.nome=="Deputado Estadual") await AsyncStorage.removeItem('@Eleicoes2018:meudeputadoestadual');
      ToastAndroid.show('Candidato removido dos Meus Candidatos', ToastAndroid.SHORT);

      this.setState({"icon":"star-border"});

    } else {

      let data = JSON.stringify({
        id: this.props.candidato.id,
        nomeUrna: this.props.candidato.nomeUrna,
        numero: this.props.candidato.numero,
        fotoUrl: this.props.candidato.fotoUrl,
      });

      if(this.props.candidato.cargo.nome=="Presidente") await AsyncStorage.setItem('@Eleicoes2018:meupresidente',data);
      else if(this.props.candidato.cargo.nome=="Governador") await AsyncStorage.setItem('@Eleicoes2018:meugovernador',data);
      else if(this.props.candidato.cargo.nome=="Senador") await AsyncStorage.setItem('@Eleicoes2018:meusenador',data);
      else if(this.props.candidato.cargo.nome=="Deputado Federal") await AsyncStorage.setItem('@Eleicoes2018:meudeputadofederal',data);
      else if(this.props.candidato.cargo.nome=="Deputado Estadual") await AsyncStorage.setItem('@Eleicoes2018:meudeputadoestadual',data);
      
      ToastAndroid.show('Candidato salvo em Meus Candidatos', ToastAndroid.SHORT);

      this.setState({"icon":"star"});

    }
  }

  render() {
    if(this.state.visible)
      return (
        <TouchableOpacity onPress={() => { this.onPress() } }>
          <MaterialIcons style={{marginRight:20}} name={this.state.icon} size={30} color={colors.white} />
        </TouchableOpacity>
      );
    else 
      return <View></View>
  }
}