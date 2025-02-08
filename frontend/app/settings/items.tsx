import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import 'react-native-reanimated';

type EventHandler = () => void;

export function SettingsButtonItem({ title,event,denger=false }: { title: string,event: EventHandler,denger?:boolean }) {
    return (
        <TouchableOpacity onPress={event}>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#eeeeee',padding:12,paddingLeft:26,paddingRight:26,flexDirection:'row'}} >
                <Text style={{fontSize:19,color:denger ?"red":"black"}}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}