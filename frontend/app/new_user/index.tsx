import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { profileStyles } from '../styles';
import { StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import { AuthContext, useAuth } from '@/utils/authContext';
import DefaultHeader from '../components/Header';
import { SignInSuccessResponse } from '@react-native-google-signin/google-signin';
import {useState,useEffect,useContext } from 'react';
export default function NewUserScreen() {
    const { user } = useAuth();

    return (
        <View style ={{height:"100%"}}>
            <DefaultHeader title="プロフィールを作りましょう！" showSettingButton={false}/>
            <View style={profileStyles.profileContainer}>
                <View style={styles.IconContainer}>
                <Image
                    source={{ uri: `${user?.data.user.photo}` }}
                />
                </View>
                <View style={(profileStyles.statusInputContainer)}>
                <TextInput
                    style={StyleSheet.compose(profileStyles.statusInput,{textAlign: 'center',paddingLeft:20})}
                    placeholder="表示名"
                    defaultValue={`${user?.data.user.name}`}
                />
                <FontAwesome 
                    name="pencil" 
                    style={profileStyles.statusEditIcon} 
                    onPress={()=>{}}
                />
                </View>
            </View>
            <View style={{borderBottomColor: 'gray',borderBottomWidth: 1,width:"50%",}}>
                <Text style={StyleSheet.compose(profileStyles.friendsTitle,{paddingLeft:20,paddingTop:10})}>基本</Text>
            </View>
        </View>
      );
  
}

const styles = StyleSheet.create({
    IconContainer: {
        position: 'relative',
        borderRadius:100
    },
    Icon: {
        fontSize: 100,
        color: '#cccccc',
    },
    EditButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: 20,
        color: '#222222',
        backgroundColor:'#999999DD',
        borderRadius:20,
        padding:7
    },
  });