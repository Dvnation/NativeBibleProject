import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Button, Alert, StyleSheet,Text, PanResponder, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Start } from './SRC/start';
import { ChapterPage } from './SRC/ChapterPage';
import { Verses } from './SRC/versepages';
import { Kjv } from './SRC/MappedVersion';
import { Search } from './SRC/search';
import { Textpage } from './SRC/text';
import * as Speech from 'expo-speech'
import { SearchPasser } from './SRC/SearchPasser';
import { AudioList } from './SRC/Favorite';
import { Settings } from './SRC/Favorite';
import { Devotionals } from './SRC/Favorite';
import { Community } from './SRC/Favorite';
import { About } from './SRC/Favorite';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from './SRC/settings';
import { Favorite } from './SRC/Favorite';
import HomeScreen from './SRC/testing';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {
    const [swpe,setswipe]= useState()
    const [tex,settex]= useState("my name is honorable and bla bla")

    const speaker=()=>{
        Speech.speak(tex)
    }

    const DrawerNavigation = ()=>{
        return(<>
            <StatusBar hidden ={true}/>
            <Drawer.Navigator initialRouteName="Home">
            
            <Drawer.Screen name="The Complete Bible" component={StackNavigator} options={({route})=>({
                    cardStyle : {backgroundColor:"blue"}, headerStyle:{backgroundColor:route.params?.backgroundColor || "antiquewhite"}
                })} />

                <Drawer.Screen name='Favorites' component={Favorite}/>
                <Drawer.Screen name='Audio List' component={AudioList}/>
                <Drawer.Screen name='Settings' component={Settings}/>
                <Drawer.Screen name='Devotionals' component={Devotionals}/>
                <Drawer.Screen name='Join a community' component={Community}/>
                <Drawer.Screen name='About' component={About}/>



          </Drawer.Navigator>

          </>  

        )
    }  

const StackNavigator =()=>{
    return(
        <Stack.Navigator initialRouteName="Home">
       
            <Stack.Screen   name="Home" component={Start} options={{ title:" ",
                cardStyle : {backgroundColor:"ivory"}, headerStyle:{backgroundColor:"antiquewhite", height:30}
            }} />
            <Stack.Screen name="ChapterPage" component={ChapterPage} options={({route})=>({ title:route.params?.name.toUpperCase()|| 'moon',
                cardStyle : {backgroundColor:"ivory"}, headerStyle:{backgroundColor:"antiquewhite"}, headerTitleStyle:{fontSize:15}
            } )} />
            <Stack.Screen name="VersePage" component={Verses} options={({route})=>({ title:route.params?.name.toUpperCase() + " "+  route.params?.chapters|| 'moon',
                cardStyle : {backgroundColor:"ivory"}, headerStyle:{backgroundColor:"antiquewhite"}, headerTitleStyle:{fontSize:15}
            } )} />
            <Stack.Screen name="TextPage" component={Kjv} />
            <Stack.Screen name="ViewPage" component={Textpage} options={({route})=>({ title:route.params?.name.toUpperCase() + " "+  route.params?.chapter|| 'moon',
                cardStyle : {backgroundColor:"ivory"}, headerStyle:{backgroundColor:"aquamarine"}, headerTitleStyle:{fontSize:15}
            } )}/>
            <Stack.Screen name="SearchPasser" component={SearchPasser} />
            <Stack.Screen name="SearchPage" component={Search} />


        </Stack.Navigator>
    )
}


    
   
    return (
        <>
        {/* <HomeScreen/> */}
<NavigationContainer>
<DrawerNavigation/>
</NavigationContainer>
 
            
        </>
    );
};



export default App;
