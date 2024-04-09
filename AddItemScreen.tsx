import React, { useRef, useState } from 'react';
import { Button, TextInput, View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { styles } from './MainComponentStyle';
import { useHeaderHeight } from '@react-navigation/elements'

const defaultColors = ['#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#14B8A6', '#6D28D9', '#4ADE80', '#F472B6'];

const styless = StyleSheet.create({
  inputStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
  },
});

function AddItemScreen({ route, navigation }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('#000000');
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();

  const height = useHeaderHeight();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={height}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}>
          
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

export default AddItemScreen;
