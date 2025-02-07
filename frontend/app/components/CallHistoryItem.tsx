import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { localStyles } from "../styles";
import Icon from 'react-native-vector-icons/SimpleLineIcons';

interface CallHistoryItemProps {
  friendName: string;
  callTimestamp: string;
  isOutgoing: boolean;
  isCaller: boolean;
  callDuration: string;
}

// どっちからかけたかbooleanで受け取る
// jsonが空なら不在着信👆false

// expoのタブバーの仕様調べる
// 三項演算子： { isFlag ? 'hello world' : 'Not hello world' }


const CallHistoryItem: React.FC<CallHistoryItemProps> = ({
  friendName,
  callTimestamp,
  isOutgoing,
  isCaller,
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
          <Icon name={isCaller ? "call-in" : "call-out"} size={16} color={isOutgoing ? "red" : "green"} />
          <Text style={[localStyles.missedCallText, { color: isOutgoing ? "red" : "green" }]}>{isOutgoing ? "不在着信" : callDuration}</Text>
        </View>
      </View>

      <Text style={localStyles.callTime}>{callTimestamp}</Text>
      <View style={localStyles.separator} />
    </View>
  );
};

export default CallHistoryItem;
