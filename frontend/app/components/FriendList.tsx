import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface FriendListProps {
  name: string;
  lastLogin: string;
}

const FriendList: React.FC<FriendListProps> = ({ name, lastLogin }) => {
  return (
    <View style={styles.friendItem}>
      <View style={styles.iconContainer}>
        <FontAwesome name="user-circle" size={45} color="#a0a0a0" /> {/* アイコンサイズを大きく */}
        <View style={styles.onlineIndicator} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.friendName}>{name}</Text>
        <Text style={styles.statusMessage}>ステータスメッセージ</Text>
      </View>
      <Text style={styles.lastLogin}>{lastLogin}</Text> {/* 右側に最終ログイン時刻を表示 */}
    </View>
  );
};

const styles = StyleSheet.create({
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    padding: 15, // paddingを大きく
    marginVertical: 7, // marginを大きく
    borderRadius: 5,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 15, // marginを大きく
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12, // サイズを大きく
    height: 12, // サイズを大きく
    borderRadius: 6, // サイズに合わせて調整
    backgroundColor: 'green',
  },
  textContainer: {
    flex: 1,
  },
  friendName: {
    fontSize: 18, // フォントサイズを大きく
    fontWeight: 'bold',
  },
  statusMessage: {
    fontSize: 16, // フォントサイズを大きく
    color: '#808080',
  },
  lastLogin: {
    fontSize: 16, // フォントサイズを大きく
    color: '#A0A0A0',
  },
});

export default FriendList;