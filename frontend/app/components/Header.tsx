import React from "react";
import { View, Text } from "react-native";
import { Header, Icon } from 'react-native-elements';
import {styles} from '../styles';

interface DefaultHeaderProps {
  title: string;
  showSettingButton: boolean;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  title,
  showSettingButton,
}) => {
  return (
    <Header
        leftComponent={
          <Text style={{
            fontSize:20,
            color:"#eeeeee",
            fontWeight:"bold",
            padding:10
          }}>{title}</Text>
        }
        rightComponent={ showSettingButton ? <Icon name='settings' color='#eeeeee' containerStyle={styles.iconContainer} /> : <></>}
        backgroundColor="#222222"
        leftContainerStyle={styles.leftContainer}
    />
  );
};

export default DefaultHeader;
