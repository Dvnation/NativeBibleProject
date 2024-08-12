import React, { useState } from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';

export default function HomeScreen({ navigation }) {

  const [display,changedisplay] = useState(0)

  const play = ()=>{
    display == 0? changedisplay(1): changedisplay(0)
    // changedisplay("flex")
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight onLongPress={()=>console.log("play")} underlayColor="yellow">
      <Text onPress={()=>console.log("llll")}>Home Screen</Text>

      </TouchableHighlight>
      <Button
        title="Open Drawer"
        onPress={() => play()}
      />
      <View>
      <Text>CP</Text>
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text>
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text>
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text>
      </View>
<View style={{backgroundColor:"blue", opacity:display, width:"10%", alignItems:"flex-end", position:"absolute", right:1}}>
<Text>CP</Text>
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 
<Text>CP</Text> 

 
</View>
    
    </View>
  );
}
