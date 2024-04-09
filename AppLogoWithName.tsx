import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AppLogoWithName = () => {
  const appVersion = DeviceInfo.getVersion();
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleFeedbackPress = () => {
    const url = 'https://forms.gle/9Pr2zVtmCTmqb2Qu6';
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={styles.appName}>Vizum</Text>
          <Text style={styles.appVersion}>Version {appVersion}</Text>
          <Image
            source={require('./assets/app-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.description}>Visa appointment tracker app</Text>
          <TouchableOpacity onPress={handleFeedbackPress} style={styles.feedbackButton}>
            <Text style={styles.feedbackButtonText}>Feedback</Text>
          </TouchableOpacity>    
      </Animated.View>
    </PanGestureHandler>
  </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Helvetica',
    color: '#000',
  },
  appVersion: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  description: {
    marginTop: 12,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  feedbackButton: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AppLogoWithName;
