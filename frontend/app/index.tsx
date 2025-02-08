import React from 'react';
import {
  Button,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthContext } from '../utils/authContext';
import 'react-native-reanimated';

export const LoginScreen = () => {
  const { googleSignIn } = useAuthContext();
  return (
    <SafeAreaView>
        <View style={{height:"100%",justifyContent:'center',alignItems:'center',}}>
        <TouchableOpacity onPress={googleSignIn}>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#eeeeee',borderRadius:30,padding:15,flexDirection:'row'}} >
                <FontAwesome name="google" size={25} color="#222222" style={{paddingRight:10}} />
                <Text style={{fontSize:20}}>Googleでログイン</Text>
            </View>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};