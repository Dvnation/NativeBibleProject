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
import { PanResponder } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SwipeGesture } from "./Swipegesture";


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
  const {verseOfScripture} = route.params
  const {chapter} = route.params
  const {verseOutline}= route.params


  const ScrollViewer = useRef();
  const ScrollViewers = useRef();
  const [swpe,setswipe]= useState()


  const [reg2, setreg2] = useState(false);
  const [content, setcontent] = useState([]);
  const [net, setnet] = useState([]);
  const [together, settog] = useState([]);
  const [chaptering,setchaptering] = useState(chapter)
  const [searches,setseatch2] = useState("man")

  useEffect(() => {
    setreg2(true);
  }, []);

  const auto = () => {

    content.splice(0, content.length);
    together.splice(0, together.length);

    net.map(item => {
      let whole = item.verses;
      whole.map((verse, index) => {
        let bookname = verse.book_name;
        let chapter = verse.chapter;
        let text = verse.text;
        let versed = verse.verse;

        if (bookname == name && chapter == 5) {
          together.push(text);
        }
      });
    });

    for (
      let i = 0;
      i <
      Math.max(kjvScan.length, verses.length, ampScan.length, netScan.length);
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

        if (verses[i]) {
          content.push(
            <View
              style={{
                borderWidth: 3,
                borderBottomWidth: 10,
                borderColor: "darkcyan",
                backgroundColor: "black",
                paddingBottom: 3,
                paddingRight: 1.5,
              }}
            >
              <Text style={{backgroundColor: "aquamarine", paddingVertical: 3}}>
                {i + 1 + " " + verses[i] + " " + "[NAB]"}
              </Text>
            </View>
          );
        }
      }
    }
  };

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
   
    if(chaptering < numbers.length && chaptering-1>0){
      setchaptering(parseInt(chaptering)-1)

      navigation.navigate('TextPage', {name : name, numbers:numbers,verseOutline: verseOutline, chapters: parseInt(chaptering)-1 , verseOfScripture: 1})
  
    }
   

  }
  return (
    <>
      {reg2 && auto()}
      
      <View  style={{borderColor: "white", borderWidth: 3}}  >
        <Text
          id="name"
          style={{
            fontSize: 22,
            alignContent: "center",
            backgroundColor: "aquamarine",
            marginBottom: 1,
            borderRightWidth: 1,
            borderColor: "black",
            borderBottomWidth: 1,
          }} 
         onPress={()=>{navigation.navigate('Home')}}  >
          {name} {chaptering}
        </Text>
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
