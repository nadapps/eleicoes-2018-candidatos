import React from 'react';
import { Card } from 'react-native-elements';
import style from './Card.style';

const CardComponent = ({ children }) => (
  <Card containerStyle={style.card}>{children}</Card>
);

export default CardComponent;
