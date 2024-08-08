  // import CheckBox from "@react-native-community/checkbox";
import {
  Children,
  useEffect,
  useRef,
  useState,
  UIManager,
  findNodeHandle,
} from "react";
import {List} from "./list";
import {Kjv} from "./MappedVersion";
import { PanResponder, TouchableHighlight } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SwipeGesture } from "./Swipegesture";
import { useNavigation } from "@react-navigation/native";


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
  useWindowDimensions,
} = require("react-native");

export function Textpage({
  route,navigation
}) {
const {numbers} = route.params
  const {name} = route.params
  const{ verses} = route.params
  const {kjvScan} =route.params
  const {netScan} = route.params
  const {ampScan} = route.params
  const {MSGscan} = route.params

  const {verseOfScripture} = route.params
  const {chapter} = route.params
  const {verseOutline}= route.params


  const ScrollViewer = useRef();
  const ScrollViewers = useRef();
  const [swpe,setswipe]= useState()


  const [reg2, setreg2] = useState(false);
  const [content, setcontent] = useState([]);
  const [net, setnet] = useState([]);
  const [NAB, setNAB] = useState([]);

  const [together, settog] = useState([]);
  const [chaptering,setchaptering] = useState(chapter)
  const [searches,setseatch2] = useState("man")
  const [NABscan,setNabScan] = useState([])
  const [underline,setunderline ] = useState(false)

  useEffect(() => {
    setreg2(true);
  }, []);

  const naval = useNavigation()
  useEffect(()=>{
const rem = navigation.addListener('beforeRemove',(e)=>{
  navigation.navigate('The Complete Bible', {backgroundColor:"antiquewhite"})
})
return rem
  },[naval])


useEffect(()=>{
  let data = require("../JSON/data.json");
  setNAB([...NAB,data]);

},[])


  const auto = () => {

    
    content.splice(0, content.length);
    together.splice(0, together.length);
    NABscan.splice(0,NABscan.length)

    // NAB.map(item => {
    //   let whole = item.verses;
    //   whole.map((verse, index) => {
    //     let bookname = verse.book_name;
    //     let chapter = verse.chapter;
    //     let text = verse.text;
    //     let versed = verse.verse;

    //     if (bookname == name && chapter == chapter) {
    //       together.push(text);
          
    //       // console.log(text+"for net");
    //     }
    //   });
    // });



    NAB.map(item => {
      let XMLBIBLE = item.XMLBIBLE;

      XMLBIBLE.map(item => {
        let bibleName = item.BIBLENAME;
        let bibleBook = item.BIBLEBOOK;

     
        if (bibleName == name) {
          let Verse = bibleBook[parseInt(chaptering) - parseInt(1)].CHAPTER;

          for (let i = 0; i < Math.max(Verse.length); i++) {
           
            if (Verse[i]) {
              const versess = Verse[i].VERSE;
              NABscan.push(versess)
             
            }
          }
        }
      })})


    for (
      let i = 0;
      i <
      Math.max(kjvScan.length, NABscan.length, ampScan.length, netScan.length,MSGscan.length);
      i++
    ) {
      if (netScan[i]) {
        content.push(
          <View
            id="NET"
            style={{
              borderWidth: 3,
              borderBottomWidth: 0,
              borderColor: "darkcyan",
              backgroundColor: "black",
              paddingBottom: 3,
              paddingRight: 1.5,
            }}
            onLayout={event => lays(event, i)}
          >
            <Text
              id={`play${i}`}
              style={{backgroundColor: "orange", paddingVertical: 3}}
            >
              {i + 1 + " " + netScan[i] + " " + "[NET]"}
            </Text>
          </View>
        );
      }

      if (MSGscan[i]) {
        content.push(
          <View
            id="NET"
            style={{
              borderWidth: 3,
              borderBottomWidth: 0,
              borderColor: "darkcyan",
              backgroundColor: "black",
              paddingBottom: 3,
              paddingRight: 1.5,
            }}
           
          >
           
            <Text
              id={`play${i}`}
              style={{backgroundColor: "blanchedalmond", paddingVertical: 3, textDecorationLine:underline?"underline":"none"}}
            onPress={()=>handlePress(MSGscan[i])}>
              {i + 1 + " " + MSGscan[i] + " " + "[MSG]"}
            </Text>
          </View>
        );
      }

      if (kjvScan[i]) {
        content.push(
          <View
            style={{
              borderWidth: 3,
              borderBottomWidth: 0,
              borderColor: "darkcyan",
              backgroundColor: "black",
              paddingBottom: 3,
              paddingRight: 1.5,
            }}
          >
            <Text style={{backgroundColor: "pink", paddingVertical: 3}}>
              {i + 1 + " " + kjvScan[i] + " " + "[KJV]"}
            </Text>
          </View>
        );
      }
      if (ampScan[i]) {
        content.push(
          <View
            style={{
              borderWidth: 3,
              borderBottomWidth: 0,
              borderColor: "darkcyan",
              backgroundColor: "black",
              paddingBottom: 3,
              paddingRight: 1.5,
            }}
          >
            <Text style={{backgroundColor: "yellow", paddingVertical: 3}}>
              {i + 1 + " " + ampScan[i] + " " + "[AMP]"}
            </Text>
          </View>
        );
      }
  

        if (NABscan[i]) {
          content.push(
            <View
              style={{
                borderWidth: 3,
                borderBottomWidth: 10,
                borderColor: "darkcyan",
                backgroundColor: "black",
                paddingBottom: 5,
                paddingRight: 1.5,
              }}
            >
              <Text style={{backgroundColor: "aquamarine", paddingVertical: 3}}>
                {i + 1 + " " + NABscan[i] + " " + "[NAB]"}
              </Text>
            </View>
          );
        }
      }
    
  };

  const handlePress = (val) =>{
    if(underline == false){
setunderline(true)
    }
    else{
setunderline(false)
    }
    console.log(val);

     <TouchableHighlight style={{backgroundColor:"red"}}>
              <Text>{val}</Text>
            </TouchableHighlight>
  }

  const lays = (event, index) => {
    if (index == verseOfScripture - 1) {
      const {height, x, y} = event.nativeEvent.layout;
      ScrollViewer.current.scrollTo({y: y});
    }
  
  };


//   const onGestureEvent = (event)=>{
//     const {translation,velocity,direction} = event.nativeEvent
//     if(direction=== "right"){
//       setswipe("right")
//       console.log("right");
//     }
//     else if(direction ==="left"){
// setswipe("left")
// console.log("left");
//     }
//   }

  

  


  
  const rightnav = ()=>{
if(chaptering < numbers.length){
  setchaptering(parseInt(chaptering)+1)

  navigation.navigate('TextPage', {name : name, numbers:numbers,verseOutline: verseOutline, chapters: parseInt(chaptering)+1, verseOfScripture: 1})

}

  }

  const leftnav = ()=>{
    if(chaptering -1 < numbers.length && chaptering-1>0){
      setchaptering(parseInt(chaptering)-1)

      navigation.navigate('TextPage', {name : name, numbers:numbers,verseOutline: verseOutline, chapters: parseInt(chaptering)-1 , verseOfScripture: 1, verses:verseOutline})
  
    }
   

  }
  return (
    <>
    { navigation.navigate('The Complete Bible', {backgroundColor:"aquamarine"})
  }   
      {reg2 && auto()}
      
      <View  style={{borderColor: "white", borderWidth: 3}}  >
        
      </View >
      <ScrollView ref={ScrollViewer} style={{flex: 1, marginTop: 0}}>

{/* <SwipeGesture onSwipeLeft={handleLeft} onSwipeRight={handleRight}> */}

        <View  style={{}}>
          {reg2 &&
            content.map((item, index) => {
              return <>{item}</>;
            })}
        </View>

        {/* </SwipeGesture> */}

        </ScrollView>


<View  style={{ flexDirection:"row", justifyContent:"space-between",opacity:0.8, backgroundColor:"aquamarine",borderBottomWidth:0.03,borderColor:"red"}}>

{/* <Button  title="left" onPress={leftnav}></Button>
<Button title="right" onPress={rightnav}></Button> */}
<Pressable onPress ={leftnav} style={{ width:"35%"}}><Text style={{ padding:6,fontSize:20,textAlign:"right"}}>{"<<<<"}</Text></Pressable>   
<Pressable onPress={rightnav} style={{width:"35%"}}><Text style={{padding:6,fontSize:20,textAlign:"left"}}>{">>>>"}</Text></Pressable>   

</View>

 </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
  },

  input: {
    color: "black",
    // alignItems:"flex-start"
    borderWidth: 2,
    backgroundColor: "pink",
    marginBottom: 1,
    paddingBottom: 10,
    borderColor: "white",
    paddingLeft: 4,
  },
});
