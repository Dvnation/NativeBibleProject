
import { ScrollView, View } from "react-native"
import { Text, StyleSheet } from "react-native"
import React from "react"
export function List({item,soft,itemed}){

    // const [sta,setSta] = useState()


    return (
        <>
        <ScrollView style = {styles.itemContainer}>
  <Text key={soft} style={{color:"black", backgroundColor:"pink"}}>{` ${item}` }</Text>
        </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({

    itemContainer:{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor : "green",
    }
})