import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Linking } from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements';

class RedesSociais extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
    });
  }

  render() {
    return (
      <View
        style={
          !this.props.style
            ? {
                flexDirection: 'row',
                padding: 10,
                paddingTop: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }
            : [
                {
                  flexDirection: 'row',
                  padding: 10,
                  paddingTop: 0,
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                this.props.style
              ]
        }
      >
        {this.props.redes.map((rede, index) => {
          return (
            <View key={index}>
              {rede.includes('facebook') && (
                <SocialIcon
                  raised
                  component={TouchableOpacity}
                  type="facebook"
                  style={{ padding: 0 }}
                  onPress={() => this.handleClick(rede)}
                />
              )}
              {rede.includes('instagram') && (
                <SocialIcon
                  raised
                  component={TouchableOpacity}
                  type="instagram"
                  style={{ padding: 0 }}
                  onPress={() => this.handleClick(rede)}
                />
              )}
              {rede.includes('youtube') && (
                <SocialIcon
                  raised
                  component={TouchableOpacity}
                  type="youtube"
                  style={{ padding: 0 }}
                  onPress={() => this.handleClick(rede)}
                />
              )}
              {rede.includes('twitter') && (
                <SocialIcon
                  raised
                  component={TouchableOpacity}
                  type="twitter"
                  style={{ padding: 0 }}
                  onPress={() => this.handleClick(rede)}
                />
              )}
              {rede.includes('flickr') && (
                <Icon
                  component={TouchableOpacity}
                  raised
                  type="entypo"
                  name="flickr"
                  color="white"
                  containerStyle={{ backgroundColor: '#FF0084', padding: 0 }}
                  onPress={() => this.handleClick(rede)}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}

RedesSociais.propTypes = {
  redes: PropTypes.array,
  style: PropTypes.object
};

RedesSociais.defaultProps = {
  redes: [],
  style: {}
};

export default RedesSociais;
