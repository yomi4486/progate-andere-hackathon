import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons"; // 追加
import DefaultHeader from "@/app/components/Header";
import CallHistoryItem from "../../components/CallHistoryItem"; // 追加: CallHistoryItemをインポート
import { localStyles } from "@/app/styles";

export default function HistoryScreen() {
  return (
    <View>
      <DefaultHeader title="着信履歴" showSettingButton={true}/>
      {/* ここに要素を追加していく */}
      <View style={localStyles.searchContainer}>
        <FontAwesome name="search" size={20} color="#a0a0a0" />
        <TextInput
          style={localStyles.searchInput}
          placeholder="検索"
          placeholderTextColor="#a0a0a0"
        />
      </View>
      <CallHistoryItem friendName="yomi" callTimestamp="30分前" isOutgoing={false} callDuration={""} />
      <CallHistoryItem friendName="mono" callTimestamp="1時間前" isOutgoing={false} callDuration={"1:20:10"} />
    </View>
  );
}