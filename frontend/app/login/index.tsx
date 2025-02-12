import React, { createContext, useContext,useEffect,useState } from 'react';
import {
  Button,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import 'react-native-reanimated';
import { AuthContext, useAuth } from '@/utils/authContext';
import * as userRequest from '../../utils/users';

const LoginScreen = () => {
  const router = useRouter();
  const { googleSignIn, isSetupAccount, idToken } = useAuth();
  const [checkingAccount, setCheckingAccount] = useState(false);

  useEffect(() => {
    const checkAccount = async () => {
      console.log(idToken)
      if (idToken && checkingAccount) {
        try {
          const res = await isSetupAccount();
          if (!res) {
            console.log("未登録のユーザーです");
            router.push('/new_user');
          } else {
            console.log("登録済みのユーザーです");
            router.push('/(tabs)');
          }
        } catch (error) {
          console.error("アカウント確認エラー", error);
        } finally {
          setCheckingAccount(false);
        }
      }
    };
    checkAccount();
  }, [idToken]);

  return (
      <SafeAreaView>
        <View style={{ height: "100%", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, paddingBottom: 10 }}>暇人同士が繋がる通話アプリ</Text>
          <Text style={{ fontSize: 32, paddingBottom: 30, fontWeight: 'bold' }}>Imacallaへようこそ</Text>
          <TouchableOpacity onPress={async () => {
            try {
              setCheckingAccount(true);
              await googleSignIn();
            } catch (error) {
              console.error("ログインエラー", error);
              setCheckingAccount(false);
            }
          }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#eeeeee', borderRadius: 30, padding: 12, paddingLeft: 26, paddingRight: 26, flexDirection: 'row' }}>
              <FontAwesome name="google" size={25} color="#222222" style={{ paddingRight: 10 }} />
              <Text style={{ fontSize: 19 }}>Googleでログイン</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

export default LoginScreen;