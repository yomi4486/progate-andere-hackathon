import { StyleSheet, TextInput, TouchableOpacity,Image  } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import FriendItem from '../components/FriendItem'; // 追加
import DefaultHeader from '../components/Header';
import {profileStyles} from '../styles';
import { useState } from 'react';
import FloatingActionButton from '@/components/FloatActionButton';
import {AppType} from '../../../backend/src';
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import { useAuth } from '@/utils/authContext';
import * as Users from '@/utils/users';
import { HonoResponseType } from '@/utils/resnposeType';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { currentUserInfo,idToken,updateCurrentUserInfo } = useAuth();
  const [statusMessage,setStatusMessage] = useState<string>("");
  return (
    <View style ={{height:"100%"}}>
      <DefaultHeader title="あなたのステータス" showSettingButton={true}/>
      <FloatingActionButton onPress={async()=>{
        // 通話開始のモーダルを表示
      }}        
        icon='add'
        color="#FFFFFF"
      />
      <View style={profileStyles.profileContainer}>
        <View>
        
        {currentUserInfo?<Image
            source={{ uri: currentUserInfo["icon_url"] }}
            style={{width:100,height:100,borderRadius:50}}
        />:<FontAwesome name="user-circle" style={styles.Icon} />}
        </View>
        <Text style={profileStyles.profileName}>{currentUserInfo?currentUserInfo["username"]:"loading..."}</Text>
        <TouchableOpacity style={profileStyles.profileStatusContainer}>
          <FontAwesome name="circle" style={profileStyles.activeDot} />
          <Text style={profileStyles.profileStatus}>アクティブ</Text>
        </TouchableOpacity>
        <View style={profileStyles.statusInputContainer}>
          <TextInput
            style={profileStyles.statusInput}
            placeholder="現在のステータスを入力"
            defaultValue={currentUserInfo?currentUserInfo['status_message']:""}
            onChangeText={(text)=>{
              setStatusMessage(text);
            }}
          />
          <FontAwesome 
            name={
              currentUserInfo&&(statusMessage==currentUserInfo['status_message'])?"pencil":"check"
            } 
            style={profileStyles.statusEditIcon} 
            onPress={async()=>{
              const res = await Users.put({status:undefined,username:undefined,icon_url:undefined,status_message:statusMessage,introduction:undefined},idToken!)
              if(currentUserInfo){
                let a:typeof currentUserInfo = currentUserInfo
                a!.status_message = res!["status_message"]
                updateCurrentUserInfo(a);
                setStatusMessage(res!["status_message"]);
              }
            }} 
          />
        </View>
      </View>
      <View style={profileStyles.friendsContainer}>
        <Text style={profileStyles.friendsTitle}>アクティブなフレンド</Text>
        <View style={profileStyles.friendsBox}>
          <FriendItem name="yomi" message="超暇" />
          <FriendItem name="まる" message="通話募集" />
          <FriendItem name="mono" message="喉がやばい" />
          {/* 他のフレンドも同様に追加 */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Icon: {
      fontSize: 100,
      color: '#cccccc',
  },
});