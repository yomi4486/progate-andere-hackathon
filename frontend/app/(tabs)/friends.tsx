import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Header,Icon } from 'react-native-elements';

import styles from '../styles';

export default function FriendsScreen() {
  return (
    <View>
        <Header
            leftComponent={
            <Text style={{
                fontSize:20,
                color:"#eeeeee",
                fontWeight:"bold",
                padding:10
            }}>フレンド</Text>
            }
            rightComponent={ <Icon name='settings' color='#eeeeee' containerStyle={styles.iconContainer} />}
            backgroundColor="#222222"
            leftContainerStyle={styles.leftContainer}
        />
    </View>
  );
}