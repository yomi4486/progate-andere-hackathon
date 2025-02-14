import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CommonModal from "./CommonModal";
import SearchComfirmModal from "./SearchComfirmModal";

interface SearchResultModalProps {
  visible: boolean;
  onClose: () => void;
  user: { name: string; iconUrl: string };
  onSendRequest: () => void;
}

const SearchResultModal: React.FC<SearchResultModalProps> = ({
  visible,
  onClose,
  user,
  onSendRequest,
}) => {
  const [isComfirmModalVisible, setComfirmModalVisible] = useState(false);

  const handleSendRequest = () => {
    onSendRequest();
    setComfirmModalVisible(true);
  };

  return (
    <>
      <CommonModal visible={visible} onClose={onClose}>
        <View style={styles.container}>
          <FontAwesome name="user-circle" size={80} color="#a0a0a0" />
          <Text style={styles.name}>{user.name}</Text>
          <TouchableOpacity
            style={styles.requestButton}
            onPress={handleSendRequest}
          >
            <Text style={styles.buttonText}>申請を送る</Text>
          </TouchableOpacity>
        </View>
        <SearchComfirmModal
          visible={isComfirmModalVisible}
          onClose={() => setComfirmModalVisible(false)}
          userName={user.name}
        />
      </CommonModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  requestButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SearchResultModal;
