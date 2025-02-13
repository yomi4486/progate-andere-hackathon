import { Text, View } from '@/components/Themed';
import { useAuth } from '@/utils/authContext';

import DefaultHeader from '../../components/Header';
import { localStyles } from '../../styles';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import FriendListContainer from '../../components/FriendListContainer';
import FloatingActionButton from '@/components/FloatActionButton';

export default function FriendsScreen() {
  const { currentUserInfo } = useAuth();
  const fromUsers = currentUserInfo!["from_users"];
  const toUsers = currentUserInfo!["to_users"];
  let updatedFromUser:typeof currentUserInfo.from_users|null=null;
  if(currentUserInfo != null){
    function removeMatchingUsers(from: typeof currentUserInfo.from_users, to: typeof currentUserInfo.to_users): typeof currentUserInfo.from_users {
      const toUserIds = new Set(to.map(user => user.to_user.id));
    
      // from_userの配列からto_userに存在しないidを持つ要素のみを残す
      return from.filter(user => !toUserIds.has(user.from_user.id));
    }
    
    updatedFromUser = removeMatchingUsers(fromUsers, toUsers);
  }else{
    // 例外処理
  }
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
      <DefaultHeader title="フレンド" showSettingButton={true}/>
      <FloatingActionButton onPress={async()=>{
        // 通話開始のモーダルを表示
      }}        
        icon='add'
        color="#FFFFFF"
      />
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