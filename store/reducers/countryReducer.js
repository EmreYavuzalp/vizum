import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Schengen countries array
const countries = [
    {"text": "Austria", "emoji": "🇦🇹"},
    {"text": "Belgium", "emoji": "🇧🇪"},
    {"text": "Czech Republic", "emoji": "🇨🇿"},
    {"text": "Denmark", "emoji": "🇩🇰"},
    {"text": "Estonia", "emoji": "🇪🇪"},
    {"text": "Finland", "emoji": "🇫🇮"},
    {"text": "France", "emoji": "🇫🇷"},
    {"text": "Germany", "emoji": "🇩🇪"},
    {"text": "Greece", "emoji": "🇬🇷"},
    {"text": "Hungary", "emoji": "🇭🇺"}
];


const bgColors = ['#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#14B8A6', '#6D28D9', '#4ADE80', '#F472B6'];
const heights = [100, 150, 120, 170, 110, 200, 140, 160];

// Modified createItem function for countries
const createItem = (country, index) => ({
    id: uuidv4(),
    text: country.text,
    emoji: country.emoji,
    bgColor: "#FFFFFF",
    textColor: '#000000',
    height: heights[index % heights.length],
});

const generateInitialItems = () => {
    return countries.map((country, index) => createItem(country, index));
};

const initialState = {
    items: generateInitialItems(),
    version: 0,
};

function countryReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_COUNTRY':
            return {
                ...state,
                items: [...state.items, { ...action.payload, id: uuidv4() }],
            };
        case 'REMOVE_COUNTRY':
            const updatedItems = state.items.filter(country => country.id !== action.payload);
            return {
                ...state,
                items: updatedItems,
            };
        case 'UPDATE_COUNTRY':
            return {
                ...state,
                items: state.items.map(country =>
                    country.id === action.payload.id ? { ...country, ...action.payload } : country
                ),
            };
        case 'RESET_COUNTRY_STORE':
            return {
                ...state,
                items: generateInitialItems(), // Reset to generated initial items
            };
        default:
            return state;
    }
}

export default countryReducer;