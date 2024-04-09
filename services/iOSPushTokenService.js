import PushNotificationIOS from "@react-native-community/push-notification-ios";

export class iOSPushTokenService {
    static getPushToken() {
        return PushNotificationIOS.requestPermissions().then(data => {
          console.log("data", data);
            return {
                token: data.deviceToken,
                tokenType: 'ios'
            };
        }).catch(error => {
            console.error("Error getting push token", error);
            return null; // or handle error appropriately
        });
    }
}
