/* global require */

import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../ThemeManager';
import BackgroundImage from './BackgroundImage';

export default function NoItems({ items }) {
  const {
    theme: { styles },
  } = useTheme();

  if (items === null) {
    return <></>;
  }
  return (
    <View style={styles.emptyListContainer}>
      <BackgroundImage source={require('../../assets/images/NoItems.png')} />
    </View>
  );
}
