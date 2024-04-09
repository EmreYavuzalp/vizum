import { Alert, Linking } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

async function appUpgradeVersionCheck(appInfo, xApiKey, config = {}) {
  const { hostname, checkForUpdateEndpoint, alertConfig = {} } = config;
  const checkForUpdateEndpointPath = `${hostname}${checkForUpdateEndpoint}`;

// Exit function if the endpoint is not defined
  if (!checkForUpdateEndpoint) {
    console.log('Update check endpoint is not defined.');
    return;
  }

// Check for internet connection before proceeding
  const connectionInfo = await NetInfo.fetch();
  if (!connectionInfo.isConnected) {
    console.log('No internet connection. Skipping update check.');
    return;
  }

  try {
    const response = await fetch(checkForUpdateEndpointPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': xApiKey,
      },
      body: JSON.stringify(appInfo),
    });

    if (!response.ok) {
        console.log('Network response was not ok');
        return;
    }

    const data = await response.json();

    if (data.isUpdateAvailable) {
      // If alertConfig is provided and valid, show custom alert. Otherwise, no action.
      if (Object.keys(alertConfig).length) {
        Alert.alert(
          alertConfig.title || 'Update Available',
          'A new version of the app is available. Please update to continue.',
          [
            /*{
              text: alertConfig.laterButtonTitle || 'Later',
              onPress: alertConfig.onLaterCallback || (() => {}),
            },*/
            {
              text: alertConfig.updateButtonTitle || 'Update Now',
              onPress: () => {
                alertConfig.onUpdateCallback && alertConfig.onUpdateCallback();
                // Direct the user to the app store based on the platform
                const storeLink = data.updateUrl;
                Linking.openURL(storeLink);
              },
            },
          ],
          { onDismiss: alertConfig.onDismissCallback || (() => {}) }
        );
      }
    }
  } catch (error) {
    console.error('There was an error checking for app updates:', error);
  }
}

export { appUpgradeVersionCheck };
