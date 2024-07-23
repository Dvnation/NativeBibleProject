// import CheckBox from "@react-native-community/checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useRef, useState} from "react";



const {
  View,
  StyleSheet,
  NativeAppEventEmitter,
  Text,
  FlatList,
  Button,
  Pressable,
  Alert,
  ScrollView,
} = require("react-native");

export function ChapterPage({ route,navigation}) {
  const {numbers} = route.params
  const {name} = route.params

  const [NABstate, setNAB] = useState([]);
  const [reg, setreg] = useState();
  const [storageOutline,setStorageOutline] = useState([]) 
  const [storageNumbering,setStorageNumbering] = useState([]) 
  const [mounted, setmounted] = useState(false)


  let [verseOutline, setVerseOutline] = useState([]);
  let [numberss, setnumberss] = useState()
let [versenumbering,setversenumbering ] = useState([])
  useEffect(() => {
    let NAB = require("../JSON/data.json");

    setNAB([...NABstate, NAB]);
  }, []);

  useEffect(()=>{
setmounted(true)
  },[])

  const textpress = (number) => {
    setreg(true);
    setnumberss(prev=>prev=number)
    verseOutline.splice(0, verseOutline.length);
    versenumbering.splice(0, versenumbering.length)
   

    NABstate.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleName = item.BIBLENAME;
        let bibleBook = item.BIBLEBOOK;

     
        if (bibleName == name) {
          let Verse = bibleBook[parseInt(number) - parseInt(1)].CHAPTER;

          for (let i = 0; i < Math.max(Verse.length); i++) {
           
            if (Verse[i]) {
              const versess = Verse[i].VERSE;
             
              verseOutline.push(versess)

             
            }
          }
        }

        bibleBook.map(item=>{

          if(item.CHAPTERNUMBER == number && bibleName == name){
            let VerseMap = item.CHAPTER
            VerseMap.map(item=>{
versenumbering.push(item.VERSENUMBER)

            })


          }
        })
      });
    });

    
    navigation.navigate('VersePage', {versenumbering: versenumbering,numbers:numbers, verseOutline: verseOutline, name:name, chapters:number})

AsyncStorage.setItem(
  'verseOutline', JSON.stringify(verseOutline)).then(
    ()=>{
      console.log("array stored well");
    }
  ).catch(
    (error)=>{
console.log("error stpring", error);
    }
  )

AsyncStorage.setItem(
  'versenumbering', JSON.stringify(versenumbering)).then(
    ()=>{
      console.log("numbering");
    }
  ).catch(
    (error)=>{
console.log("error stpring", error);
    }
  )

AsyncStorage.setItem('number', number)

// sessionStorage.setItem("verseOutline", JSON.stringify(verseOutline))
// sessionStorage.setItem("versenumbering", JSON.stringify(versenumbering))





  };

  const bookClick=()=>{
    navigation.navigate('Home')
  }
  const Verseclick =()=>{
   

  }

  return (
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
          }}>{name}</Text>
    </View>
      <View style={styles.containerHeader}>
        <Text style={styles.font} onPress={bookClick}>BOOKS</Text>
        <Text style={styles.chapter}>CHAPTER</Text>
        <Text style={styles.font} onPress={Verseclick}>VERSE</Text>
      </View>
    

     
     {
      mounted && <ScrollView style={{marginTop:5, flex: 1, margin:10}}>
      <View style={styles.container}>
        {numbers.map((item,index) => {
          return (
           <>
            <Text key={index} onPress={() => textpress(item)} style={styles.list}>
              {item}
              
            </Text>
           </>
          );
        })}
      </View>
    </ScrollView>
     }
     

    </>
  );
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
    backgroundColor:"darksalmon",
    paddingVertical:6,
    elevation:5
  },

  chapter:{
textDecorationLine:"underline",
fontSize:20
  },

  list: {
    color: "black",
    // alignItems:"flex-start"
    // borderWidth: 5,
    backgroundColor: "darksalmon",
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
