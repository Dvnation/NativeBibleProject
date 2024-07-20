import { useRef} from "react";



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
    TextInput,
    ViewComponent,
    findNodeHandle
  } = require("react-native");
export function Lego(){
const play = []
const scrollViewRef = useRef([])

    const man = "i am a boy"
play.splice(0,play.length)
    for (let i = 0; i < 200; i++) {
        const element = man + i
        // console.log(element);
        play.push(element)
    }
    
    

//     const scroller = (index)=>{
// // console.log("peace");
// console.log(index);
// console.log(scrollViewRef.current[index]+"kkk")
//         // const nodeHandle = findNodeHandle(scrollViewRef.current[index])
//         const ref = scrollViewRef.current[index]
//         const ref2 = scrollViewRef.current

//         console.log(ref+"lll");

        
//             if (ref2) {
//                 setTimeout(() => {
//                 ref.measure(
//                     (x,y,height,pageX)=>{
//     console.log(x +"ojo",y,height,pageX);
//                     },
    
                 
//                 ),
//                 (error)=>{
//                     console.log("check", error);
//                 }  
//             }, 500);

//             }

    
// }
const auto =()=>{
 

  let mess =   scrollViewRef.current.children[0].children[8]
console.log(mess.getBoundingClientRect());
let height = mess.getBoundingClientRect().top
scrollViewRef.current.scrollTo({y:height})
}

const handlelay =(event,index)=>{
if(index == 170){
    const {height,x,y} = event.nativeEvent.layout
    console.log(`${index} is ${y}`);
scrollViewRef.current.scrollTo({y:y})
    
}
}
    
    return(
        <>
        <Button title="jump to" onPress={auto}></Button>
      <View style={{flex:1}}>

      <ScrollView ref={scrollViewRef}  >
       <View  style={{flex:1}}>
            {
                play.map((item,index)=>{
if(scrollViewRef.current){
    return(
        
        <View key={index} onLayout={(event)=>handlelay(event,index)}>
        <Text id="ScrollText">{item}</Text>
                {/* <Button title="click to scroll" onPress={()=>scroller(index)}></Button> */}

        
                            </View>
       )

}
                })
            }
        </View>
       </ScrollView>
       <View style={{flex:1}}>
       </View>
      </View>
        </>
    )
}