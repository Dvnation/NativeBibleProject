import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Nets } from "./NET";
import { Textpage } from "./text";
import { Start } from "./start";
import { Verses } from "./versepages";
import { ChapterPage } from "./ChapterPage";
import { Search } from "./search";


export function Kjv({route,navigation}) {

  const {name} = route.params
  const {chapters} = route.params
  const {verseOutline} = route.params
  const {verseOfScripture} = route.params
  const {numbers} = route.params

  const [getKjv, setKjv] = useState([]);
  const [kjvScan, setKjvScan] = useState([])
  const [getNet, setNet] = useState([])
  const [netScan, setnetScan] = useState([])
  const [ampScan, setampScan] = useState([])
  const [getAmp,setAmp]= useState([])
  const [getMSG,setMSG] = useState([])
  const [MSGscan,setMSGscan] = useState([])

  useEffect(() => {
    let data = require("../JSON/kjv.json");
    setKjv([...getKjv,data]);

    let data2 = require("../JSON/net.json")
    setNet([...getNet,data2])

    let data3 = require("../JSON/realAmp.json")
    setAmp([...getAmp,data3])


    let data4 = require("../JSON/AMP.json")
    setMSG([...getMSG,data4])
  }, []);



  kjvScan.splice(0, kjvScan.length)
  netScan.splice(0,netScan.length)
  ampScan.splice(0,ampScan.length)
  MSGscan.splice(0,MSGscan.length)



  getKjv.forEach(item => {
    let whole = item.verses;
    whole.forEach(verse => {
      let bookname = verse.book_name;
      let chapter = verse.chapter;
      let text = verse.text;
      let versed = verse.verse

      if (bookname === name && chapter == chapters) {
        kjvScan.push(text);

       
      }
    });
  });

  
  getNet.forEach(item => {
    let whole = item.verses;
    whole.forEach(verse => {
      let bookname = verse.book_name;
      let chapter = verse.chapter;
      let text = verse.text;
      let versed = verse.verse
    

      if (bookname === name && chapter == chapters) {
        netScan.push(text);
       
      }
    });
  });


  getAmp.map(item => {
    let XMLBIBLE = item.XMLBIBLE;

    XMLBIBLE.map(item => {
      let bibleBook = item.BIBLEBOOK;

      for (let i = 0; i < bibleBook.length; i++) {
        const verses = bibleBook[i].CHAPTER[chapters]
        const names = bibleBook[i].CHAPTER[0]
if(names.BOOKNAME == name.toUpperCase()){

  // console.log(verses.VERS);
  let textArrary = verses.VERS
  textArrary.map(item=>{
    ampScan.push(item)

  })

} 
      }
    
    });
  })


  getMSG.map(item => {
    let XMLBIBLE = item.XMLBIBLE;

    XMLBIBLE.map(item => {
      let bibleBook = item.BIBLEBOOK;

      for (let i = 0; i < bibleBook.length; i++) {
        const verses = bibleBook[i].CHAPTER[chapters]
        const names = bibleBook[i].CHAPTER[0]
if(names.BOOKNAME == name.toUpperCase()){

  // console.log(verses.VERS);
  let textArrary = verses.VERS
  textArrary.map(item=>{
    MSGscan.push(item)

  })

} 
      }
    
    });
  })

    
      
    
    
      

  return (
    <>
{
  navigation.navigate('ViewPage', {name:name,numbers:numbers,chapter:chapters,verses:verseOutline,kjvScan:kjvScan,netScan:netScan,ampScan:ampScan,MSGscan:MSGscan,verseOfScripture:verseOfScripture,verseOutline:verseOutline})
 }  
 
{
}
{/* <Start/> */}

  
             {/* <Textpage name={name} chapter={chapters} verses={verseOutline} kjvScan = {kjvScan} netScan = {netScan} ampScan={ampScan} verseOfScripture={verseOfScripture}/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
