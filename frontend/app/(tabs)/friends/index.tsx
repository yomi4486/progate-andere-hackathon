import { Text, View } from '@/components/Themed';

import DefaultHeader from '../../components/Header';
import { localStyles } from '../../styles';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import FriendListContainer from '../../components/FriendListContainer';

export default function FriendsScreen() {
  const activeFriends = [
    { name: 'yomi', lastLogin: '10分前', isActive: true },
    { name: 'mono', lastLogin: '20分前', isActive: true },
  ];

  const inactiveFriends = [
    { name: 'まる', lastLogin: '1日前', isActive: false },
    { name: 'kuro', lastLogin: '3日前', isActive: false },
  ];
  return (
    <View style={{height:"100%"}}>
      <View>
          <DefaultHeader title="フレンド" showSettingButton={true}/>
      </View>
      <View style={localStyles.searchContainer}>
        <FontAwesome name="search" size={20} color="#a0a0a0" />
        <TextInput
          style={localStyles.searchInput}
          placeholder="検索"
          placeholderTextColor="#a0a0a0"
        />
      </View>
      <FriendListContainer title="アクティブなフレンド" friends={activeFriends} />
      <FriendListContainer title="非アクティブなフレンド" friends={inactiveFriends} />
    </View>


  );
}