import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

export const Loader = () => {
  return (
    <>
      <View style={styles.overlay}>
        <LottieView
          style={styles.animation}
          source={require('../assets/Animations/Loader.json')}
          autoPlay
          loop
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  animation: {
    width: 300,
    height: 300,
  },
});
