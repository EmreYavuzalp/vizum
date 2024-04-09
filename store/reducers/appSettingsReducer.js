import { v4 as uuidv4 } from 'uuid';

// Define the app modes
const AppModes = {
    INIT: 'INIT',
    STARTING: 'STARTING',
    STARTED: 'STARTED',
};

// Generate initial state with a unique userId, and placeholders for token and tokenType
const initialState = {
    userId: uuidv4(), // Unique user ID generated on app initialization
    token: '', // Placeholder for a token, to be set later
    tokenType: '', // Placeholder for token type (android, ios), to be set later
    appMode: AppModes.INIT,
    toolTipMode: 0,
    version: 0,
};

// Reducer to handle app settings actions
function appSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_APP_MODE':
            return {
                ...state,
                appMode: action.payload,
            };
        case 'SET_TOOLTIP_MODE':
            return {
                ...state,
                toolTipMode: action.payload,
            };
        case 'SET_USER_TOKEN': // Handle setting the user token
            return {
                ...state,
                token: action.payload.token,
                tokenType: action.payload.tokenType,
            };
        case 'RESET_APP_SETTINGS_STORE':
            // Reset to initial state but keep the unique userId generated at the initial load
            return {
                ...initialState,
                userId: state.userId,
            };
        default:
            return state;
    }
}

export default appSettingsReducer;
