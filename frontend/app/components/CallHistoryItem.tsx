import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { localStyles } from "../(tabs)/history/style";

interface CallHistoryItemProps {
  friendName: string;
  callTimestamp: string;
  isOutgoing: boolean;
  callDuration: string;
}

// どっちからかけたかbooleanで受け取る
// jsonが空なら不在着信👆false

// expoのタブバーの仕様調べる

const CallHistoryItem: React.FC<CallHistoryItemProps> = ({
  friendName,
  callTimestamp,
  isOutgoing,
  callDuration,
}) => {
  return (
    <View style={localStyles.callHistoryItem}>
      <View style={localStyles.friendIconContainer}>
        <FontAwesome name="user-circle" size={60} color="#a0a0a0" />
        <View style={localStyles.onlineIndicator} />
      </View>
      <View style={localStyles.callDetails}>
        <Text style={localStyles.friendName}>{friendName}</Text>
        <View style={localStyles.missedCallContainer}>
          <FontAwesome name="phone" size={16} color={isOutgoing ? "green" : "red"} />
          <Text style={localStyles.missedCallText}>{isOutgoing ? "発信" : "不在着信"}</Text>
        </View>
        <Text style={localStyles.callDuration}>{callDuration}</Text>
      </View>
      <Text style={localStyles.callTime}>{callTimestamp}</Text>
      <View style={localStyles.separator} /> {/* 追加: 下部の線 */}
    </View>
  );
};

export default CallHistoryItem;
