import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EUBackgroundView from './EUBackgroundView'; // Ensure the path is correct

// Assuming formatHelpers may still be useful for any date formatting needs

// Updated styles to include new requirements
const updatedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  countryContent: {
    padding: 8,
    backgroundColor: '#FFF', // Inner view with white background
    borderRadius: 4,
    width: '100%', // This will make it fill the entire width
  },
  timeIndicatorText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  bigFont: {
    color: '#000000',
    fontSize: 20, // Adjust the size as needed
  },
  itemContainer: {
    flexDirection: 'row', // Align emoji and text horizontally
    alignItems: 'center', // Align items vertically in the center
    paddingLeft: 8, // Add padding to the left side of the container
  },
});


function toCountryView(items) {
  return items.map(item => ({
    ...item,
    height: item.height || 100, // Keeping height if you want to maintain dynamic heights
  }));
}

const MainComponent = () => {
  const items = useSelector(state => state.countries.items); // Assuming your data is now countries
  const countries = toCountryView(items);

  const renderItem = ({ item }) => (
    <View style={{marginBottom: 4}}>
      <EUBackgroundView>
        <View style={[updatedStyles.countryContent, { backgroundColor: item.bgColor }]}>
          <View style={updatedStyles.itemContainer}>
            <Text style={[updatedStyles.bigFont, { paddingRight: 8 }]}>{item.emoji}</Text>
            <Text style={updatedStyles.bigFont}>{item.text}</Text>
          </View>
        </View>
      </EUBackgroundView>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={updatedStyles.container}>
        <FlatList
          data={countries}
          keyExtractor={item => item.id} // Assuming each country has a unique ID
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default MainComponent;
