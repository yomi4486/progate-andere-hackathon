import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { profileStyles } from '../styles';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import DefaultHeader from '../components/Header';
import { SettingsButtonItem } from './items';
export default function SettingsScreen() {
  return (
    <View style ={{height:"100%"}}>
        <DefaultHeader title="設定" showSettingButton={false} showBackButton={true}/>
        <View style={{borderBottomColor: 'gray',borderBottomWidth: 1,width:"50%",}}>
            <Text style={StyleSheet.compose(profileStyles.friendsTitle,{paddingLeft:20,paddingTop:10})}>プロフィール</Text>
        </View>
        <View style={profileStyles.profileContainer}>
            <View style={styles.IconContainer}>
                <FontAwesome name="user-circle" style={styles.Icon} />
                <FontAwesome name="pencil" style={styles.EditButton} />
            </View>
            <View style={(profileStyles.statusInputContainer)}>
            <TextInput
                style={StyleSheet.compose(profileStyles.statusInput,{textAlign: 'center',paddingLeft:20})}
                placeholder="表示名"
                value='yomi4486'
            />
            <FontAwesome 
                name="pencil" 
                style={profileStyles.statusEditIcon} 
                onPress={()=>{}}
            />
            </View>
        </View>
        <View style={{borderBottomColor: 'gray',borderBottomWidth: 1,width:"50%",}}>
            <Text style={StyleSheet.compose(profileStyles.friendsTitle,{paddingLeft:20,paddingTop:10})}>基本</Text>
        </View>
        <SettingsButtonItem title="ログアウト" denger={true} event={()=>{}}/>
    </View>
  );
}

const styles = StyleSheet.create({
    IconContainer: {
        position: 'relative',
    },
    Icon: {
        fontSize: 100,
        color: '#cccccc',
    },
    EditButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: 20,
        color: '#222222',
        backgroundColor:'#999999DD',
        borderRadius:20,
        padding:7
    },
  });