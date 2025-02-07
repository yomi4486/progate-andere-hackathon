import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserIcon from './UserIcon';

interface FriendListProps {
  name: string;
  lastLogin: string;
}

const FriendList: React.FC<FriendListProps> = ({ name, lastLogin }) => {
  return (
    <View style={styles.friendItem}>
      <UserIcon size={45} isOnline={true} /> {/* UserIconコンポーネントを使用 */}
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