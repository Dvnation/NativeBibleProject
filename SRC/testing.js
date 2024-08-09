import React from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight onLongPress={()=>console.log("play")} underlayColor="yellow">
      <Text onPress={()=>console.log("llll")}>Home Screen</Text>

      </TouchableHighlight>
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />

    
    </View>
  );
}
