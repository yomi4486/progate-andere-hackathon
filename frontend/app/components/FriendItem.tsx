import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface FriendItemProps {
  name: string;
  message: string;
}

const FriendItem: React.FC<FriendItemProps> = ({ name, message }) => {
  return (
    <View style={styles.friend}>
      <View style={styles.friendIconContainer}>
        <FontAwesome name="user-circle" style={styles.friendIcon} />
        <FontAwesome name="circle" style={styles.friendActiveDot} />
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{name}</Text>
        <View style={styles.friendMessageContainer}>
          <Text style={styles.friendMessage}>{message}</Text>
        </View>
      </View>
      <FontAwesome name="phone" style={styles.callIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  friendIconContainer: {
    position: 'relative',
  },
  friendIcon: {
    fontSize: 50,
    color: '#007bff',
  },
  friendActiveDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 18,
    color: '#4CAF50',
  },
  friendInfo: {
    marginLeft: 10,
    flex: 1,
  },
  friendName: {
    fontSize: 16,
  },
  friendMessageContainer: {
    marginTop: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
    maxWidth: '90%',
  },
  friendMessage: {
    fontSize: 14,
    color: '#333',
  },
  callIcon: {
    fontSize: 30,
    marginRight: 10,
    color: '#007bff',
  },
});

export default FriendItem;
