import messaging from '@react-native-firebase/messaging';

export class AndroidPushTokenService {
    static async getPushToken() {
        try {
            // Request permissions (required for iOS, good practice for Android)
            await messaging().requestPermission();
            // Get the device token for push notifications
            const token = await messaging().getToken();

            // Return the token and token type
            return {
                token: token,
                tokenType: 'android'
            };
        } catch (error) {
            console.error("Error getting push token", error);
            return null; // Or handle the error as needed
        }
    }
}
