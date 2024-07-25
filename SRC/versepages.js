import { useState,useEffect } from "react"
import { View,ScrollView,Text,StyleSheet } from "react-native"


export function Verses({route, navigation}){

    const {versenumbering} = route.params
    const {name} = route.params
    const {verseOutline} = route.params
    const {chapters}= route.params
    const {numbers}= route.params

    const [verse,setverse] = useState()
    const [reg,setreg] = useState()
    
  const [getKjv, setKjv] = useState([]);
  const [kjvScan, setKjvScan] = useState([])
  const [getNet, setNet] = useState([])
  const [netScan, setnetScan] = useState([])
  const [ampScan, setampScan] = useState([])
  const [getAmp,setAmp]= useState([])

    useEffect(() => {
      let data = require("../JSON/kjv.json");
      setKjv([...getKjv,data]);
  
      let data2 = require("../JSON/net.json")
      setNet([...getNet,data2])
  
      let data3 = require("../JSON/realAmp.json")
      setAmp([...getAmp,data3])
  
    }, []);


    kjvScan.splice(0, kjvScan.length)
    netScan.splice(0,netScan.length)
    ampScan.splice(0,ampScan.length)
  
  
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
          netScan.push(text)
         
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
  
        




    const textPress=(item)=>{
      setverse(item)
      // console.log(item);


      console.log(numbers);
      console.log(verseOutline);
      console.log(chapters);

      navigation.navigate('ViewPage', {name:name,numbers:numbers,chapter:chapters,verses:verseOutline,kjvScan:kjvScan,netScan:netScan,ampScan:ampScan,verseOfScripture:item,verseOutline:verseOutline})

    }

    const Chapterclick =()=>{
      navigation.navigate('ChapterPage', {numbers : numbers, name:name})

    }

    
  const bookClick=()=>{
    navigation.navigate('Home')
  }

    return(
      <>
 <View>
      <Text style={{
            fontSize: 22,
            alignContent: "center",
            backgroundColor: "white",
            marginBottom: 1,
            borderRightWidth: 1,
            borderColor: "black",
            borderBottomWidth: 5,
          }} onPress={ ()=>   navigation.navigate('Home') }>{name}{" "+ chapters}</Text>
    </View>
<View style={styles.containerHeader}>
        <Text style={styles.font} onPress={bookClick}>BOOKS</Text>
        <Text style={styles.font} onPress={Chapterclick}>CHAPTER</Text>
        <Text style={styles.verse}>VERSE</Text>
      </View>


<ScrollView style={{flex:1, margin:9 ,marginTop:5}}>
  <View style={styles.container}>

    {
      versenumbering.map((item,index)=>{
        return(
          <Text key={index} onPress={()=>textPress(item) } style={styles.list}>{item}</Text>
        )
      })
    }
  </View>
</ScrollView>

{

}

</>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    
      width: "100%",
      
    },
    containerHeader: {
      flexDirection: "row",
      // borderWidth: 5,
      // borderColor: "black",
      justifyContent: "space-around",
      marginBottom:6,
      backgroundColor:"chocolate",
      paddingVertical:6,
      elevation:5
    },

    verse:{
fontSize:20,
textDecorationLine:"underline"
    },
  
    list: {
      color: "black",
      // alignItems:"flex-start"
      // borderWidth: 5,
      backgroundColor: "chocolate",
      margin: 5,
      paddingVertical: 5,
      paddingLeft:4,
      borderColor:"grey",
      borderBottomWidth:1,
      borderRightWidth:1,
  borderTopLeftRadius:5,
  elevation:4,
    },
  });
  