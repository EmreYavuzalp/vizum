import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import countryReducer from './reducers/countryReducer.js';
import appSettingsReducer from './reducers/appSettingsReducer.js';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['countries', 'appSettings']
};

const rootReducer = combineReducers({
  countries: countryReducer,
  appSettings: appSettingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
