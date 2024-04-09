import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListViewScreen from './ListViewScreen';
import AddItemScreen from './AddItemScreen';
import AppLogoWithName from './AppLogoWithName';
import { TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import messaging from '@react-native-firebase/messaging';
import { AndroidPushTokenService } from './services/AndroidPushTokenService';
import { BackendService } from './services/BackendService';


const Stack = createNativeStackNavigator();

const CustomHeaderTitle = ({ title }) => {
  const dispatch = useDispatch();
  const [tapCount, setTapCount] = useState(0);

  const handleTitlePress = useCallback(() => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount === 5) {
      dispatch({ type: 'RESET_COUNTRY_STORE' });
      setTapCount(0);
    }
  }, [tapCount, dispatch]);

  return (
    <TouchableOpacity onPress={handleTitlePress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const HeaderLeftButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('AppLogoWithName')}>
            <FontAwesomeIcon icon={faInfoCircle} size={24} color="#000" />
    </TouchableOpacity>
  );
};

const HeaderRightButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const NavigationWrapper = () => {
  const dispatch = useDispatch();
  const appSettings = useSelector((state: { appSettings: { appMode: string, toolTipMode: number, token: string, userId: string, tokenType: string } }) => state.appSettings);

  useEffect(() => {
    // Request permission to receive notifications
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken(); // Get FCM token after permission is granted
      }
    };

    AndroidPushTokenService.getPushToken().then(({ token, tokenType }) => {
      dispatch({
        type: 'SET_USER_TOKEN',
        payload: {
          token,
          tokenType,
        },
      });

      // After receiving the token and updating the app settings, update the backend
      BackendService.updatePushToken(appSettings.userId, token, tokenType).then(() => {
        console.log('Backend has been updated with the new token and type.');
      });
    });

    // Get the device FCM token
    const getFCMToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token -> ', token);
      // You can also proceed to save this token to your server
    };

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Optionally show an alert or a notification in the app
      Alert.alert(remoteMessage.data?.data1, remoteMessage.data?.data2);
    });

    messaging().getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
        // Navigate to the desired screen or perform another action
      }
    });
  


    // Call request permission function
    requestUserPermission();

    // Listen to whether the token is refreshed or not
    const unsubscribe = messaging().onTokenRefresh(token => {
      console.log('Token refreshed', token);
      // Handle the refreshed token here (e.g., save to your server)
    });

    // Remember to unsubscribe from the token refresh listener
    return () => unsubscribe();
  }, []);

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListView">
        <Stack.Screen 
          name="ListView" 
          component={ListViewScreen} 
          options={{ 
              title: 'Countries', 
              headerTitle: (props) => <CustomHeaderTitle {...props} title="Vizum" />,
              headerTitleAlign: 'center',
              headerRight: () => <HeaderRightButton />,
              headerLeft: () => <HeaderLeftButton />,
            }} 
          />
        <Stack.Screen name="AddItem" options={{ title: 'Add New' }} component={AddItemScreen} />
        <Stack.Screen 
          name="AppLogoWithName" 
          component={AppLogoWithName} 
          options={{ title: 'Info' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButtonText: {
    fontSize: 24,
    color: 'black',
  },
  leftButtonText: {
    fontSize: 24,
    color: 'blue',
  },
});

export default NavigationWrapper;
