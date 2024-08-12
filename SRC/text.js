  // import CheckBox from "@react-native-community/checkbox";
import {
  Children,
  useEffect,
  useRef,
  useState,
  UIManager,
  findNodeHandle,
} from "react";
import { PanResponder, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard'


const {
  View,
  StyleSheet,
  NativeAppEventEmitter,
  Text,
  FlatList,
  Button,
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

  const [copied,setcopied] = useState([name+ " "+ chapter])

  const [reg2, setreg2] = useState(false);
  const [content, setcontent] = useState([]);
  const [net, setnet] = useState([]);
  const [NAB, setNAB] = useState([]);

  const [together, settog] = useState([]);
  const [chaptering,setchaptering] = useState(chapter)
  const [searches,setseatch2] = useState("man")
  const [NABscan,setNabScan] = useState([])
  
  const [display,changedisplay] = useState(0)



  const [highlight,setHighlight]= useState([])
  const [highlightKjv,setHighlightKjv]= useState([])
  const [highlightNab,setHighlightNab]= useState([])
  const [highlightAmp,setHighlightAmp]= useState([])
  const [highlightMsg,setHighlightMsg]= useState([])


  useEffect(() => {
    setreg2(true);
  }, []);

  useEffect(()=>{
console.log(highlight.length+ "gone");
if (highlight == "" && highlightAmp=="" && highlightKjv=="" && highlightMsg=="" && highlightNab=="") {
changedisplay(0)
}
else{
  console.log(highlight,highlightAmp,highlightKjv,highlightMsg,highlightNab);
}
  })

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

const UnderlineRef = useRef([])
const UnderlineRefMsg = useRef([])
const UnderlineRefKjv = useRef([])
const UnderlineRefAmp = useRef([])
const UnderlineRefNab = useRef([])





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
           <Pressable key={i} onPress={()=>handlePressNet(netScan[i],i)} >
           <Text
              id={`play${i}`} ref={(ref)=>UnderlineRef.current[i]= ref}
              style={{backgroundColor:"orange", paddingVertical: 3}}
            >
              {i + 1 + " " + netScan[i] + " " + "[NET]"}
            </Text>
           </Pressable>
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
             <Pressable key={i} onPress={()=>handlePressMsg(MSGscan[i],i)} >
           <Text
              id={`play${i}`}  ref={(ref)=>UnderlineRefMsg.current[i]= ref}
              style={{backgroundColor: "blanchedalmond", paddingVertical: 3}}
            >
              {i + 1 + " " + MSGscan[i] + " " + "[MSG]"}
            </Text>
           </Pressable>
           
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
              <Pressable key={i} onPress={()=>handlePressKjv(kjvScan[i],i)} >
           <Text
              id={`play${i}`}   ref={(ref)=>(UnderlineRefKjv.current[i]= ref)}
              style={{ backgroundColor:"pink", paddingVertical: 3}}
            >
              {i + 1 + " " + kjvScan[i] + " " + "[KJV]"}
            </Text>
           </Pressable>
          
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
              <Pressable key={i}   onPress={()=>handlePressAmp(ampScan[i],i)} >
           <Text
              id={`play${i}`}    ref={(ref)=>UnderlineRefAmp.current[i]= ref}
              style={{ backgroundColor:"yellow", paddingVertical: 3}}
            >
              {i + 1 + " " + ampScan[i] + " " + "[AMP]"}
            </Text>
           </Pressable>
           
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
                <Pressable delay key={i} onPress={()=>handlePressNab(NABscan[i],i)} >
           <Text
              id={`play${i}`}    ref={(ref)=>(UnderlineRefNab.current[i]= ref)}
              style={{ backgroundColor:"aquamarine", paddingVertical: 3}}
            >
              {i + 1 + " " + NABscan[i] + " " + "[NAB]"}
            </Text>
           </Pressable>
           
            </View>
          );
        }
      }
    
  };

  const handlePressMsg = (val,verse) =>{
    // console.log(val);


    if(highlightMsg.includes(verse)){
      // alert("yes")
      UnderlineRefMsg.current[verse].setNativeProps({style:{textDecorationLine:"none"}})
      let man = highlightMsg.filter(item=>item!==verse)
      setHighlightMsg(man)
      
      let remove = copied.filter(item=>item!==verse)
      setcopied(remove)
      let remove2 = copied.filter(item=>item!==val)
      setcopied(remove2)
      }
      
        if(!highlightMsg.includes(verse)){
      
changedisplay(1)      
        setHighlightMsg([...highlightMsg,verse])
      
        UnderlineRefMsg.current[verse].setNativeProps({style:{textDecorationLine:"underline"}})
        copied.push(val+ " "+`[${verse+1}] [MSG]`)
      
      
      }

      // await Clipboard.setStringAsync(val)
      // Alert.alert('copied', val)

   
  }
  const handlePressAmp = (val,verse) =>{
    // console.log(val);


    if(highlightAmp.includes(verse)){
      // alert("yes")
      UnderlineRefAmp.current[verse].setNativeProps({style:{textDecorationLine:"none"}})
      let man = highlight.filter(item=>item!==verse)
      setHighlightAmp(man)
      console.log(highlightAmp+"he");
      
      let remove = copied.filter(item=>item!==verse)
      setcopied(remove)
      let remove2 = copied.filter(item=>item!==val)
      setcopied(remove2)
      }
      
        if(!highlightAmp.includes(verse)){
      
changedisplay(1)      
        setHighlightAmp([...highlightAmp,verse])
      
        UnderlineRefAmp.current[verse].setNativeProps({style:{textDecorationLine:"underline"}})
        copied.push(val+ " "+`[${verse+1}] [AMP]`)
      
      
      }

      // await Clipboard.setStringAsync(val)
      // Alert.alert('copied', val)

   
  }
  const handlePressKjv = (val,verse) =>{
    


    if(highlightKjv.includes(verse)){
      UnderlineRefKjv.current[verse].setNativeProps({style:{textDecorationLine:"none"}})

      let man = highlightKjv.filter(item=>item!==verse)
      setHighlightKjv(man)
      
      let remove = copied.filter(item=>item!==verse)
      setcopied(remove)
      let remove2 = copied.filter(item=>item!==val)
      setcopied(remove2)
      }
      
        if(!highlightKjv.includes(verse)){
          UnderlineRefKjv.current[verse].setNativeProps({style:{textDecorationLine:"underline"}})

        // alert("no")
        changedisplay(1)
      
        setHighlightKjv([...highlightKjv,verse])
      
      copied.push(val+ " "+`[${verse+1}] [KJV]`)
      
      
      }

      // await Clipboard.setStringAsync(val)
      // Alert.alert('copied', val)

   
  }
  const handlePressNet = (val,verse) =>{
// UnderlineRef.current[verse].style.backgroundColor="red";

if(highlight.includes(verse)){
  UnderlineRef.current[verse].setNativeProps({style:{textDecorationLine:"none"}})

// setunderline("none")
let man = highlight.filter(item=>item!==verse)
setHighlight(man)
console.log(highlight.length+"true");

let remove = copied.filter(item=>item!==verse)
setcopied(remove)
let remove2 = copied.filter(item=>item!==val)
setcopied(remove2)

}

  if(!highlight.includes(verse)){
    UnderlineRef.current[verse].setNativeProps({style:{textDecorationLine:"underline"}})

changedisplay(1)
  // alert("no")

  setHighlight([...highlight,verse])

copied.push(val+ " "+`[${verse+1}] [NET]`)


}


   
  }
  const handlePressNab = (val,verse) =>{
    // console.log(val);
    // display == 0? changedisplay(1): changedisplay(0)

    if(highlightNab.includes(verse)){
      UnderlineRefNab.current[verse].setNativeProps({style:{textDecorationLine:"none"}})
      let man = highlightNab.filter(item=>item!==verse)
      setHighlightNab(man)
      
      let remove = copied.filter(item=>item!==verse)
      setcopied(remove)
      let remove2 = copied.filter(item=>item!==val)
      setcopied(remove2)
      }
      
        if(!highlightNab.includes(verse)){
      
        // alert("no")
        changedisplay(1)

        setHighlightNab([...highlightNab,verse])
      
        UnderlineRefNab.current[verse].setNativeProps({style:{textDecorationLine:"underline"}})
        copied.push(val+ " "+`[${verse+1}] [NAB]`)
      
      
      }

      // await Clipboard.setStringAsync(val)
      // Alert.alert('copied', val)

   
  }

  const copy =async ()=>{
    changedisplay(0)

  await Clipboard.setStringAsync(copied.toString())
  console.log(copied);
  setunderline("none")
  setunderlineAmp("none")
  setunderlineKjv("none")
  setunderlineMsg("none")
  setHighlightNab("none")

copied.splice(0,copied.length)

 
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

        {/* <Button  title="copy" onPress={copy}></Button> */}

<View  style={{ flexDirection:"row", justifyContent:"space-between",opacity:0.8, backgroundColor:"aquamarine",borderBottomWidth:0.03,borderColor:"red"}}>


<Pressable onPress ={leftnav} style={{ width:"35%"}}><Text style={{ padding:6,fontSize:20,textAlign:"right"}}>{"<<<<"}</Text></Pressable>   
<Pressable onPress={rightnav} style={{width:"35%"}}><Text style={{padding:6,fontSize:20,textAlign:"left"}}>{">>>>"}</Text></Pressable>   

</View>
<View style={{backgroundColor:"whitesmoke", opacity:display, justifyContent:"center", right:1, position:"absolute", top:0, marginRight:5}}>
<Text onPress={copy} style={{backgroundColor:"yellow", marginBottom:7,fontSize:20, borderWidth:2,borderColor:"black",textAlign:"center", borderRadius:5}}>COPY TEXT</Text>
<Text style={{backgroundColor:"aquamarine",marginBottom:7,fontSize:20,borderWidth:2,borderColor:"black", borderRadius:5,textAlign:"center"}}>FAVORITE</Text>
<Text style={{backgroundColor:"pink",marginBottom:7,fontSize:20,borderWidth:2,borderColor:"black", borderRadius:5,textAlign:"center"}}>LISTEN</Text>
<Text style={{backgroundColor:"burlywood",marginBottom:4,fontSize:20,borderWidth:2,borderColor:"black", borderRadius:5,textAlign:"center", fontWeight:"light"}}>RECORD</Text>


 

 
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
