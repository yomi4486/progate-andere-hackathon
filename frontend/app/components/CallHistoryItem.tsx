import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { localStyles } from "../styles";

interface CallHistoryItemProps {
  friendName: string;
  callTime: string;
}

// どっちからかけたかbooleanで受け取る
// jsonが空なら不在着信👆false

// expoのタブバーの仕様調べる

const CallHistoryItem: React.FC<CallHistoryItemProps> = ({
  friendName,
  callTime,
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
          <FontAwesome name="phone" size={16} color="red" />
          <Text style={localStyles.missedCallText}>不在着信</Text>
        </View>
      </View>
      <Text style={localStyles.callTime}>{callTime}</Text>
    </View>
  );
};

export default CallHistoryItem;
