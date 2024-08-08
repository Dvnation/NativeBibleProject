// import CheckBox from "@react-native-community/checkbox";
import {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from "./settings";
import HomeScreen from "./testing";


const {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  Pressable,
  Alert,
  ScrollView,
  TextInput,
  PanResponder,
} = require("react-native");
const Drawer = createDrawerNavigator();


export function Start({navigation}) {
  const [NABstate, setNAB] = useState([]);
  const [bname, setBname] = useState();
  const [bibleNames, setBiblenames] = useState([]);
  const [reg, setReg] = useState();
  const [reg2, SetReg2] = useState();
  const [reg3, setReg3] = useState();
  const [reg4, setReg4] = useState(false);
  const [vnum,setvnum] = useState()
  const [voutline,setvoutline] = useState()
  const [goToVerse,setgoToVerse] = useState(false)
  const [versenumber,setVerseNumber] = useState(1)
  
  const [getKjv, setKjv] = useState([]);
  const [kjvScan, setKjvScan] = useState([])

  const [search2,setseatch2] = useState([])
  const [swpe,setswipe]= useState()

  const [searches, setsearh] = useState();

  const [sdisplay, setdisplay] = useState([]);

  const [chapterNumbers, setChapterNumber] = useState([]);

  let [img, setimg] = useState()

  useEffect(() => {

    let NAB = require("../JSON/data.json");

    setNAB([...NABstate, NAB]);
    let data = require("../JSON/kjv.json");
    setKjv([...getKjv,data]);
  }, []);
 

  useEffect(() => {
    active();
    getKjv.forEach(item => {
      let whole = item.verses;
      whole.forEach(verse => {
        let bookname = verse.book_name;
        let chapter = verse.chapter;
        let text = verse.text;
  search2.push(verse)
  
  
      });
    });
  

  }, [NABstate]);

useEffect(()=>{

},[])
  const active = () => {

    setReg(true);
    NABstate.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleBook = item.BIBLENAME;
        //   console.log(bibleBook);
        bibleNames.splice(0, bibleNames.length)
        // bibleNames.push(bibleBook);
        setBiblenames(preV => {
          const newArray = [...preV, bibleBook ];
          return newArray;
        });
      });
    });
  };

  const EnterChapter = name => {
// console.log("ioio");

    setimg(name);
    SetReg2(true);
    setReg4(true)
    // setgoToVerse(false)

    chapterNumbers.splice(0, chapterNumbers.length);

    
    NABstate.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleName = item.BIBLENAME;
        let BIBLEBOOK = item.BIBLEBOOK;

        
            // console.log(name);
          // setChapterNumber([])
if(  bibleName == name){
          for (let i = 0; i < BIBLEBOOK.length; i++) {
            const element = BIBLEBOOK[i].CHAPTERNUMBER;
           
            chapterNumbers.push(element);
         
          
        }

}
      
      });
    })
      navigation.navigate('ChapterPage', {numbers : chapterNumbers, name:name})
      // navigation.navigate('The Complete Bible', {backgroundColor:"green"})


  };



const searching = ()=>{
// Search()
  navigation.navigate('SearchPage', {searches:searches})
}



  

  const Verseclick =()=>{
  chapterNumbers.splice(0,chapterNumbers.length)

// }
    if (AsyncStorage) {
AsyncStorage.getItem("versenumbering").then(
  (storedArray)=>{
const vnums = JSON.parse(storedArray)
setvnum(vnums)

  }
).catch(
  (error)=>{
    console.log("error receiving srtay", error);

  }
)

AsyncStorage.getItem("verseOutline").then(
  (storedArray)=>{
const outline = JSON.parse(storedArray)
setvoutline(outline)

  }
).catch(
  (error)=>{
    console.log("error receiving srtay", error);

  }
  
)

AsyncStorage.getItem("number").then((item)=>{
if(item == "undefined"){
  // setVerseNumber(item)
  // console.log(item);
  console.log("e no de for item");
}
else{
  setVerseNumber(item)
}
})



     

    }
    else{
      console.log("no value");
    }
    chapterNumbers.splice(0,chapterNumbers.length)

    NABstate.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleName = item.BIBLENAME;
        let BIBLEBOOK = item.BIBLEBOOK;

        if (    img  == "undefined" || !img  ) {
      bibleName == img
          for (let i = 0; i < BIBLEBOOK.length; i++) {
            const element = BIBLEBOOK[i].CHAPTERNUMBER;
           
            chapterNumbers.push(element);
         
          }
        }
        else if(img!=="undefined" || img) {
          
            bibleName == img
            for (let i = 0; i < BIBLEBOOK.length; i++) {
              const element = BIBLEBOOK[i].CHAPTERNUMBER;
             
              chapterNumbers.push(element);
           

          }
        }
        
        
      });
    });

    // console.log(chapterNumbers +"=cnum");
    // console.log(voutline + "=voutline");
    // console.log(vnum+"=vnum");
   
    if(voutline == "undefined" || vnum == "undefined" || !versenumber || versenumber=="undefined"){
      setgoToVerse(false)
      navigation.navigate('Home')

  
    }
    
  else if(versenumber&&vnum&&voutline){
    setgoToVerse(true)
  }
  }

  const ball = ()=>{
    chapterNumbers.splice(0,chapterNumbers.length)


    NABstate.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleName = item.BIBLENAME;
        let BIBLEBOOK = item.BIBLEBOOK;

        if ( bibleName == "Genesis") {
          //   console.log(name);
          // setChapterNumber([])
          for (let i = 0; i < BIBLEBOOK.length; i++) {
            const element = BIBLEBOOK[i].CHAPTERNUMBER;
           
            chapterNumbers.push(element);
         
          }
        }

      
      });
    });
      navigation.navigate('ChapterPage', {numbers : chapterNumbers, name:"Genesis"})
console.log("its");
  }

  const noball = ()=>{
    chapterNumbers.splice(0,chapterNumbers.length)

    NABstate.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleName = item.BIBLENAME;
        let BIBLEBOOK = item.BIBLEBOOK;

        if ( bibleName == img) {
          //   console.log(name);
          // setChapterNumber([])
          for (let i = 0; i < BIBLEBOOK.length; i++) {
            const element = BIBLEBOOK[i].CHAPTERNUMBER;
           
            chapterNumbers.push(element);
         
          }
        }

      
      });
    });

    console.log("notttt");

      navigation.navigate('ChapterPage', {numbers : chapterNumbers, name:img})

  }
  
  return (
   

    <View  style={{flex:1, marginTop:10}}>
{ navigation.navigate('The Complete Bible', {backgroundColor:"antiquewhite"})
}   
      <View style={styles.container}>
        <Text style={styles.bible}>BOOKS</Text>
        {/* <Text style={styles.font} onPress={Chapterclick}>CHAPTER</Text> */}
        <Text style={styles.font} onPress={()=>img?noball():ball()}>CHAPTER</Text>

        <Text style={styles.font}>VERSE</Text>

      </View>

      <View style={{flexDirection: "row"}}>
        <TextInput
          style={{borderColor: "black", borderWidth: 1, width: "60%"}}
          placeholder="search"
          onChangeText={query => setsearh(query)}

          onKeyPress={event => {
            if(event.key === "Enter"){
           searching()
            }
          
            
          }}
        ></TextInput>
        <Pressable />
        <Button title="search item"  onPress={searching}  />
      </View>
    
     
      
      {
       reg && (
        <ScrollView style={{flex:1, margin:8}}>
          <View style={styles.containerDiv2}>
            {bibleNames.map((item,index) => {
              return (
                <Text key={index} onPress={() => EnterChapter(item)} style={styles.list}>
                  {item.toUpperCase()}
                </Text>
              );
            })}
          </View>
          </ScrollView>
      )}

     

       {/* {<ChapterPage numbers={chapterNumbers} name={img} />} */}



      {/* </View>
      </ScrollView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderWidth: 5,
    // borderColor: "black",
    justifyContent: "space-around",
    marginTop: -2,
    marginBottom:6,
    backgroundColor:"burlywood",
    paddingVertical:6,
    elevation:5
  },


  font: {
    color: "black",
    fontWeight: "bold",
    
  },
  
  bible:{
    color: "black",
    fontWeight: "bold",
    textDecorationLine:"underline",
    fontSize:20

  },
  containerDiv: {
    borderWidth: 2,
    borderColor: "red",
    width: "100%",
  },
  containerDiv2: {
    // flex: 1,
 
    // width: "100%",
    // backgroundColor:"gray"

    // justifyContent:"flex-end"
    
  },

  list: {
    color: "black",
    // alignItems:"flex-start"
    // borderWidth: 5,
    // fontFamily:"cursive",
    backgroundColor: "burlywood",
    margin: 5,
    paddingVertical: 5,
    paddingLeft:4,
    borderColor:"grey",
    borderBottomWidth:1,
    borderRightWidth:1,
borderTopLeftRadius:5,
elevation:4,


  },
  list2: {
    color: "black",
    // alignItems:"flex-start"
    borderWidth: 2,
    backgroundColor: "whitesmoke",
    marginBottom: 1,
    paddingBottom: 10,
    borderColor: "white",
  },
});
