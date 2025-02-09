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
        <Text style={{fontSize:18,paddingBottom:10}}>暇人同士が繋がる通話アプリ</Text>
        <Text style={{fontSize:32,paddingBottom:30,fontWeight:'bold'}}>Imacallaへようこそ</Text>
        <TouchableOpacity onPress={googleSignIn}>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#eeeeee',borderRadius:30,padding:12,paddingLeft:26,paddingRight:26,flexDirection:'row'}} >
                <FontAwesome name="google" size={25} color="#222222" style={{paddingRight:10}} />
                <Text style={{fontSize:19}}>Googleでログイン</Text>
            </View>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};