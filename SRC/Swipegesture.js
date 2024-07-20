import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

export const SwipeGesture = ({onSwipeLeft,onSwipeRight,children})=>{

    const PanGestureHandlers =(event)=>{
        if(event.nativeEvent.translationX > 100){

            onSwipeRight && onSwipeLeft()

        }
        else if(event.nativeEvent.translationX < -100){
            onSwipeLeft && onSwipeRight()
        }
    }

    

    return(
       <PanGestureHandler onGestureEvent={PanGestureHandlers} activeOffsetX={[-30,30]} failOffsetY={[-5,5]} >
<View style={{flex:1}}>

    {children}
</View>

       </PanGestureHandler>
    )
}

