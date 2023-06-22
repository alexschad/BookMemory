import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BackgroundImage = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    maxWidth: '80%',
  },
});

export default BackgroundImage;
