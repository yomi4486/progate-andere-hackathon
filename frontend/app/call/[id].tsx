import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import {
  AudioSession,
  LiveKitRoom,
  useRoomContext,
} from "@livekit/react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as RoomService from "../../utils/room";
import { useAuth } from "../../utils/authContext";

const CallScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let start = async () => {
      let data = await RoomService.get(
        user!.data.idToken as string,
        id as string,
      );
      setAccessToken(data.access_token);
      await AudioSession.startAudioSession();
    };

    start();
    return () => {
      AudioSession.stopAudioSession();
    };
  }, []);

  return (
    <View>
      {accessToken ? (
        <LiveKitRoom
          serverUrl="wss://qwet-dev-cyhgi9fp.livekit.cloud"
          token={accessToken}
          connect={true}
          audio={true}
        >
          <Screen />
        </LiveKitRoom>
      ) : (
        <Text>読み込み中</Text> // Or any fallback UI
      )}
    </View>
  );
};

function Screen() {
  const room = useRoomContext();
  const [mic, setMic] = useState(true);
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* 上部ヘッダー */}
      <View style={styles.header}></View>

      {/* プロフィール画像 */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <Text style={styles.userName}>yomi</Text>
        <Text style={styles.timer}>00:12</Text>
        <View style={styles.audioWave} />
      </View>

      {/* 通話操作ボタン */}
      <View style={styles.controlContainer}>
        <TouchableOpacity
          onPress={() => {
            setMic(!mic);
            room.localParticipant.setMicrophoneEnabled(mic);
          }}
        >
          <Icon name="microphone-slash" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="volume-up" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* 通話終了ボタン */}
      <TouchableOpacity
        style={styles.endCallButton}
        onPress={() => {
          router.push("/(tabs)");
          room.disconnect();
        }}
      >
        <Icon name="times" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  header: {
    width: "100%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  expandIcon: {
    position: "absolute",
    left: 20,
    top: 30,
  },
  callingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "gray",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  timer: {
    fontSize: 16,
    color: "gray",
    marginVertical: 5,
  },
  audioWave: {
    width: 50,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginTop: 10,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  endCallButton: {
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default CallScreen;
