import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import React, { useEffect } from 'react';
import NavigationWrapper from './NavigationWrapper';
import { appUpgradeVersionCheck } from './sdk/other-good-things-update-sdk';

const App = () => {
  useEffect(() => {
    const apiKey = "2a126e80-c6e5-4d4f-84d3-d6ccebf85075";
    const appInfo = {
      appId: 'com.aribilisim.vizum',
      appName: 'ViZum - Schengen Randevu Bildirimi',
      appVersion: '1.0.0',
      platform: 'ios',
      environment: 'production',
    };

    const hostname = 'https://othergoodthings-updates-7df65d0773dd.herokuapp.com';
    const checkForUpdateEndpoint = '/api/checkForUpdate';

    const config = {
      hostname,
      checkForUpdateEndpoint,
      alertConfig: {
        title: 'Please Update',
        updateButtonTitle: 'Update Now',
        laterButtonTitle: 'Later',
        onDismissCallback: () => console.log('Dismiss'),
        onLaterCallback: () => console.log('Later'),
        onUpdateCallback: () => console.log('Update'),
      },
    };

    //appUpgradeVersionCheck(appInfo, apiKey, config);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationWrapper />
      </PersistGate>
    </Provider>
  );
};

export default App;
