import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Button, Alert, StyleSheet,Text, PanResponder } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Start } from './SRC/start';
import { ChapterPage } from './SRC/ChapterPage';
import { Verses } from './SRC/versepages';
import { Kjv } from './SRC/MappedVersion';
import { Search } from './SRC/search';
import { Textpage } from './SRC/text';



const Stack = createStackNavigator();

const App = () => {
    const [swpe,setswipe]= useState()

const Page1 = ()=>{
    return<Text>Page1</Text>
}

const Page2 = ()=>{
    return<Text>Page2</Text>
}


    const Swipeable = ({navigation})=>{
        const panResponder = PanResponder.create({
            onMoveShouldSetPanResponder:(evt,gestureState)=>true,
            onPanResponderMove:(evt, gestureState)=>{
                const {dx} = gestureState;
                if(dx>100){
                    setswipe("left")
                }
                else if(dx < -100){
                    // navigation.navigate('Page1')
setswipe("right")
                }
            },
          onPanResponderRelease:()=>{
            if(swpe == "left"){
                navigation.navigate('Page2')

                // console.log("swiped left");
            }
            else if(swpe == "right"){
                navigation.navigate('Page1')

console.log("right");
            }
          }

        })

        return(
            <View {...panResponder.panHandlers}>
<Text>Swipe to switch pageshihiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</Text>
            </View>
        )
    }
   
    return (
        <>

        
           
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                <Stack.Screen   name="Page1" component={Page1} />
                <Stack.Screen   name="Page2" component={Page2} />
                <Stack.Screen   name="Swipeable" component={Swipeable} />

                    <Stack.Screen   name="Home" component={Start} />
                    <Stack.Screen name="ChapterPage" component={ChapterPage} />
                    <Stack.Screen name="VersePage" component={Verses} />
                    <Stack.Screen name="TextPage" component={Kjv} />
                    <Stack.Screen name="SearchPage" component={Search} />
                    <Stack.Screen name="ViewPage" component={Textpage} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};



export default App;
