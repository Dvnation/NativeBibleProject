import React, { useEffect, useRef, useState } from "react"
import { View,Text, Image } from "react-native"
import myImage from '../assets/dv.png.jpg'
import { ScrollView } from "react-native-gesture-handler"
import { Button } from "react-native"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function Favorite(){
const route = useRoute()
const navigation = useNavigation()


let [way,setway] = useState([])



    const [valuess,setvaluess] = useState([])


    let value = route.params && route.params.value


useEffect(()=>{
  async function play (){
 const stored = await AsyncStorage.getItem("gel")

 if(stored!==null){
const parsedItem = JSON.parse(stored)
 
 setvaluess(prevArray =>[...prevArray,parsedItem])

//  valuess.push(stored ? JSON.parse(stored): "[MSG]JGJGFJFJF")
 }

         
}     
      
    
    // }
play()


    

},[])


    
useEffect(()=>{


// route.params.value == null && setvaluess(way)
// way ? setvaluess(way) :

// console.log(value +"ithis way");

route.params &&
 valuess.push(route.params.value) 

 AsyncStorage.setItem('gel', JSON.stringify(valuess) )


    AsyncStorage.getItem("gel").then(
        (storedArray)=>{
      const getterJSON = JSON.parse(storedArray)
      console.log(getterJSON);
      setvaluess(getterJSON)      
        }
      )

//   
   
},[value])


    const clear = ()=>{
    
    valuess.splice(0,valuess.length)
    setvaluess([])
navigation.setParams({value:[]})
 
    }

    const get = ()=>{
        console.log(localStorage.getItem("gel"));
    }


    return(
        <>
{console.log(valuess)}
        <Button onPress={clear} title="clear"></Button>
        <Button onPress={get} title="get"></Button>



     <ScrollView>
       
    <View style={{flex:1}}>
        {
           valuess.map((item,index)=>{
              return   item.includes("[MSG]")  ? <View style={styles.Views}> <Text style={styles.MSG}  key={index}>{item }</Text> 
   </View> : item.includes('[NAB]') ? <View style={styles.Views}> <Text style={styles.NAB}  key={index}>{item }</Text> 
   </View> :  item.includes('[AMP]') ? <View style={styles.Views}> <Text style={styles.AMP}  key={index}>{item }</Text> 
   </View> : item.includes('[NET]') ? <View style={styles.Views}> <Text style={styles.NET}  key={index}>{item }</Text> 
   </View> : item.includes('[KJV]') ? <View style={styles.Views}> <Text style={styles.KJV}  key={index}>{item }</Text> 
   </View> : <Text>hgiigi</Text>
            })

        
        }


        </View>

     
       </ScrollView>

        </>
    )

}

const styles = StyleSheet.create({


    
     Views :   {borderWidth: 1,
        borderColor: "black",
        paddingBottom: 3,
        paddingRight: 1.5, 
    marginTop:3
    },
      
    
    MSG: {
    
      backgroundColor: "blanchedalmond",
     
    },
    NAB: {
    
        backgroundColor: "aquamarine",
       
      }, NET: {
    
        backgroundColor: "orange",
       
      }, AMP: {
    
        backgroundColor: "yellow",
       
      }, KJV: {
    
        backgroundColor: "pink",
       
      },
  });
  
export function AudioList({route}){
    const {myParam} = route.params
// const navigation = useNavigation()
// const myParam = navigation.params.myParam
    return(
        <>
        <View>
            <Text>
                {myParam}
            </Text>
        </View>
        </>
    )

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


