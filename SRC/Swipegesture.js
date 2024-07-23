import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

export const SwipeGesture = ({onSwipeLeft,onSwipeRight,children})=>{

    const PanGestureHandlers =(event)=>{
        if(event.nativeEvent.translationX > 20){

            onSwipeLeft

        }
        else if(event.nativeEvent.translationX < -20){
          onSwipeRight()
        }
    }

    

    return(
       <PanGestureHandler onGestureEvent={PanGestureHandlers} activeOffsetX={[-90,90]} failOffsetY={[-50,50]} >
<View style={{flex:1}}>

    {children}
</View>

       </PanGestureHandler>
    )
}

