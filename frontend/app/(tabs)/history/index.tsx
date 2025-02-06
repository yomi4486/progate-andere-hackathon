import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "@/components/Themed";
import { Header, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons"; // 追加

import styles from "../../styles";
import { localStyles } from "./style"; // 修正: localStylesをインポート
import CallHistoryItem from "../../components/CallHistoryItem"; // 追加: CallHistoryItemをインポート

export default function HistoryScreen() {
  return (
    <View>
      <Header
        leftComponent={
          <Text
            style={{
              fontSize: 20,
              color: "#eeeeee",
              fontWeight: "bold",
              padding: 10,
            }}
          >
            着信履歴
          </Text>
        }
        rightComponent={
          <Icon
            name="settings"
            color="#eeeeee"
            containerStyle={styles.iconContainer}
          />
        }
        backgroundColor="#222222"
        leftContainerStyle={styles.leftContainer}
      />
      {/* ここに要素を追加していく */}
      <View style={localStyles.searchContainer}>
        <FontAwesome name="search" size={20} color="#a0a0a0" />
        <TextInput
          style={localStyles.searchInput}
          placeholder="検索"
          placeholderTextColor="#a0a0a0"
        />
      </View>
      <CallHistoryItem friendName="yomi" callTime="30分前" />
      <CallHistoryItem friendName="mono" callTime="1時間前" />
    </View>
  );
}
