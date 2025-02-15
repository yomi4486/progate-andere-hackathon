import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5'

import { Ionicons } from '@expo/vector-icons'

type SimpleModalProps = {
  children: ReactNode;
  visible:boolean;
  title?:string;
  visibleControler:Function;
};

const SimpleModal: React.FC<SimpleModalProps> = ({ children,visible,title,visibleControler }) => {
  return (
    visible ? 
    <TouchableOpacity onPress={()=>visibleControler()} style={{zIndex:1000,height:"100%",width:"100%",alignItems:'center',justifyContent:'center',backgroundColor:"#00000088",position:"absolute"}}>
      <TouchableOpacity activeOpacity={1} style={{minHeight:"auto",width:"75%", backgroundColor:"#cccccc",borderRadius:13}}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
          {title ? <Text style={{fontWeight:"bold",fontSize:23,padding:20,color:"#222222"}}>{title}</Text>: <></>}
          <Ionicons name="close" size={26} style={{padding:20,color:"#222222"}} onPress={()=>{visibleControler()}}/>
        </View>
        <View style={{paddingBottom:20,paddingLeft:24,paddingRight:24}}>{children}</View>
      </TouchableOpacity>
    </TouchableOpacity>
    :
    <></>
  );
};

export default SimpleModal;