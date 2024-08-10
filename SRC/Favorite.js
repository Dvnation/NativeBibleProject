import React from "react"
import { View,Text, Image } from "react-native"
import myImage from '../assets/dv.png.jpg'


export function Favorite(){

}
export function AudioList(){

}

export function Settings(){

}

export function Devotionals(){

}

export function About(){


    return(
        <>
        <View style={{flex:1, backgroundColor:"bisque"}}>
        <Text style={{fontSize:30,borderColor:"white", fontWeight:"heavy", borderWidth:3, backgroundColor:"darksalmon"}}>The App</Text>
        <Text style={{fontSize:15}}>The Complete Bible is a bible app with the most profound interface that provides you with all necessary tools and a convenient interface to study the bible and get the most out of it 
        </Text>
        <Text style={{fontSize:30,borderColor:"white", fontWeight:"heavy", borderWidth:3, backgroundColor:"burlywood", marginTop:70}}>The Developer</Text>
        <Image source={myImage} style={{height:200, width:200}}/>

        <Text style={{fontSize:17, fontWeight:"heavy"}}>Ugochukwu Divine Brown(Dv_nation)</Text>
<Text style={{fontSize:15, marginTop:9}}>, An intimate with God's Kingdom, A Medical Student, A drummer and A Tech Enthusiast</Text>

</View>
        </>
    )

}

export function Community(){

}


