import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Header, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import FriendItem from '../components/FriendItem'; // 追加

import styles from '../styles';

const localStyles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileIcon: {
    fontSize: 100,
    color: '#eeeeee', // アイコンの色を変更
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  activeDot: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 5,
  },
  profileStatus: {
    fontSize: 16,
    color: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#e0f7e0',
    overflow: 'hidden',
  },
  statusInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  statusInput: {
    flex: 1,
    height: 40,
  },
  statusEditIcon: {
    fontSize: 20,
    color: '#888',
    marginLeft: 10,
  },
  friendsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  friendsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendsBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default function HomeScreen() {
  return (
    <View>
      <Header
        leftComponent={
          <Text style={{
            fontSize:20,
            color:"#eeeeee",
            fontWeight:"bold",
            padding:10
          }}>あなたのステータス</Text>
        }
        rightComponent={ <Icon name='settings' color='#eeeeee' containerStyle={styles.iconContainer} />}
        backgroundColor="#222222"
        leftContainerStyle={styles.leftContainer}
      />
      <View style={styles.container}>
        
        {/* ここに要素を追加していく */}
      </View>
      <View style={localStyles.profileContainer}>
        <FontAwesome name="user-circle" style={localStyles.profileIcon} />
        <Text style={localStyles.profileName}>あなたの名前</Text>
        <TouchableOpacity style={localStyles.profileStatusContainer}>
          <FontAwesome name="circle" style={localStyles.activeDot} />
          <Text style={localStyles.profileStatus}>アクティブ</Text>
        </TouchableOpacity>
        <View style={localStyles.statusInputContainer}>
          <TextInput
            style={localStyles.statusInput}
            placeholder="現在のステータスを入力"
          />
          <FontAwesome name="pencil" style={localStyles.statusEditIcon} />
        </View>
      </View>
      <View style={localStyles.friendsContainer}>
        <Text style={localStyles.friendsTitle}>アクティブなフレンド</Text>
        <View style={localStyles.friendsBox}>
          <FriendItem name="yomi" message="超暇" />
          <FriendItem name="まる" message="通話募集" />
          <FriendItem name="mono" message="喉がやばい" />
          {/* 他のフレンドも同様に追加 */}
        </View>
      </View>
    </View>
  );
}