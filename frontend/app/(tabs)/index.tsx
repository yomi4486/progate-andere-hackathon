import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useEffect,useState } from 'react';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import FriendItem from '../components/FriendItem'; // 追加
import DefaultHeader from '../components/Header';
import {profileStyles} from '../styles';
import {AppType} from '../../../backend/src';
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import { useAuthContext } from './../../utils/authContext';

export default function HomeScreen() {
  return (
    <View style ={{height:"100%"}}>
      <DefaultHeader title="あなたのステータス" showSettingButton={true}/>
      <View style={profileStyles.profileContainer}>
        <FontAwesome name="user-circle" style={profileStyles.profileIcon} />
        <Text style={profileStyles.profileName}>{"あなたの名前"}</Text>
        <TouchableOpacity style={profileStyles.profileStatusContainer}>
          <FontAwesome name="circle" style={profileStyles.activeDot} />
          <Text style={profileStyles.profileStatus}>アクティブ</Text>
        </TouchableOpacity>
        <View style={profileStyles.statusInputContainer}>
          <TextInput
            style={profileStyles.statusInput}
            placeholder="現在のステータスを入力"
          />
          <FontAwesome name="pencil" style={profileStyles.statusEditIcon} />
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