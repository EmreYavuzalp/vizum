import React, { useEffect } from 'react';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import MainComponent from './MainComponent';
import { useDispatch } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/elements';


function ListViewScreen({ navigation }) {
  const dispatch = useDispatch();
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height}
      behavior="padding"
      style={{ flex: 1 }}
      enabled>
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
        <MainComponent />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default ListViewScreen;
