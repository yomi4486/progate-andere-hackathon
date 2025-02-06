import { Text, View } from '@/components/Themed';

import DefaultHeader from '../../components/Header';

export default function FriendsScreen() {
  return (
    <View>
        <DefaultHeader title="フレンド" showSettingButton={true}/>
    </View>
  );
}