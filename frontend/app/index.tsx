import React from 'react';
import {
  Button,
  SafeAreaView,
  View
} from 'react-native';
import { useAuthContext } from '../utils/authContext';
import 'react-native-reanimated';

export const LoginScreen = () => {
  const { googleSignIn } = useAuthContext();
  return (
    <SafeAreaView>
        <Button onPress={googleSignIn} title={'Googleログイン'} />
    </SafeAreaView>
  );
};