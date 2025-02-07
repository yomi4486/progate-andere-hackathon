import { Text, View } from '@/components/Themed';

import DefaultHeader from '../components/Header';

export default function SettingsScreen() {
  return (
    <View>
        <DefaultHeader title="設定" showSettingButton={false} showBackButton={true}/>
    </View>
  );
}