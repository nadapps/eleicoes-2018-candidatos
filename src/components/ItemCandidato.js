import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import PropTypes from 'prop-types';

class ItemCandidato extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Row
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#CCC',
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Col size={30}>
            <Text
              style={{ fontWeight: 'bold', paddingRight: 15, fontSize: 11 }}
            >
              {this.props.title}
            </Text>
          </Col>
          <Col size={70}>
            <Text style={{ fontSize: 11 }}>{this.props.value}</Text>
          </Col>
        </Row>
      </View>
    );
  }
}

ItemCandidato.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
};

ItemCandidato.defaultProps = {
  title: '',
  value: ''
};

export default ItemCandidato;
