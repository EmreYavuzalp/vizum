import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native';

const EUBackgroundView = ({ children }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.paddingContainer}>
        <ImageBackground
          source={require('./assets/eu-tile.png')}
          resizeMode="repeat"
          style={styles.background}
        >
          {children}
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4, // Add border radius for rounded corners
    overflow: 'hidden', // Ensure content inside doesn't overflow rounded corners
  },
  paddingContainer: {
    width: '100%', // Fill the container width
    height: '100%', // Fill the container height
  },
  background: {
    flex: 1, // Expand the background image to fill the available space
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12, // Apply padding here
  },
});

export default EUBackgroundView;
