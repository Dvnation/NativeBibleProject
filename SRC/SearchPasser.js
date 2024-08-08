import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";





export function SearchPasser({name,chapters,verseOutline,verseOfScripture,navigation,numbers}){






    const [getKjv, setKjv] = useState([]);
    const [kjvScan, setKjvScan] = useState([])
    const [getNet, setNet] = useState([])
    const [netScan, setnetScan] = useState([])
    const [ampScan, setampScan] = useState([])
    const [getAmp,setAmp]= useState([])
    const [chapterLength,setChapterLength] = useState([])
    const [getMSG,setMSG] = useState([])
    const [MSGscan,setMSGscan] = useState([])

// const {name} = route.params



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
    
    
      getKjv.forEach(item => {
        chapterLength.splice(0,chapterLength.length)

        let whole = item.verses;
        whole.forEach(verse => {
          let bookname = verse.book_name;
          let chapter = verse.chapter;
          let text = verse.text;
          let versed = verse.verse

          if (bookname === name) {
            chapterLength.push(chapter)
           
          }
    
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

      getMSG.map(item => {
        let XMLBIBLE = item.XMLBIBLE;
    
        XMLBIBLE.map(item => {
          let bibleBook = item.BIBLEBOOK;
    
          for (let i = 0; i < bibleBook.length; i++) {
            const verses = bibleBook[i].CHAPTER[chapters]
            const names = bibleBook[i].CHAPTER[0]
    if(names.BOOKNAME == name.toUpperCase()){
    
      let textArrary = verses.VERS
      textArrary.map(item=>{
        MSGscan.push(item)
    
      })
    
    } 
          }
        
        });
      })
    
    
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
    
          
        
        


    return(
        <>
      {
  navigation.navigate('ViewPage', {name:name,numbers:99,chapter:chapters,verses:verseOutline,kjvScan:kjvScan,MSGscan:MSGscan,netScan:netScan,ampScan:ampScan,verseOfScripture:verseOfScripture,verseOutline:verseOutline})
 }  
 
        
        </>
    )

}