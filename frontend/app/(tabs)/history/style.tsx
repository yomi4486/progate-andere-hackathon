import { StyleSheet } from 'react-native';

export const localStyles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EEEEEE', // 背景色を指定
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginTop: 30,
      marginBottom: 30
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      color: '#A0A0A0',
    },
    // ...他のスタイルをここに追加...
    callHistoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#EEEEEE',
    },
    friendIconContainer: {
      position: 'relative',
      marginRight: 10,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 15,
      height: 15,
      borderRadius: 10,
      backgroundColor: 'green',
    },
    callDetails: {
      flex: 1,
    },
    friendName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    missedCallContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    missedCallText: {
      marginLeft: 5,
      color: 'red',
    },
    callTime: {
      color: '#A0A0A0',
    },
    separator: {
      height: 2, // 下線の太さをさらに変更
      backgroundColor: '#DDDDDD',
      marginTop: 10,
    },
    callDuration: { // 追加: 通話時間のスタイル
        color: '#A0A0A0',
        },
});