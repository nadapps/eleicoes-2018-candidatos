import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';

const ItemCandidatoComponent = ({ title, value }) => (
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
        <Text style={{ fontWeight: 'bold', paddingRight: 15, fontSize: 11 }}>
          {title}
        </Text>
      </Col>
      <Col size={70}>
        <Text style={{ fontSize: 11 }}>{value}</Text>
      </Col>
    </Row>
  </View>
);

ItemCandidatoComponent.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
};

ItemCandidatoComponent.defaultProps = {
  title: '',
  value: ''
};

export default ItemCandidatoComponent;
