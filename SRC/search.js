
import { useEffect, useState } from "react";
import { Text,ScrollView,View,StyleSheet,Button } from "react-native";
export function Search({route,navigation}){

    const {sdisplay} = route.params
    const {bibleBook} = route.params
    const {searches} = route.params
    const {number} = route.params

    const [kjv,setkjv]= useState([])
    const [nab,setnab]= useState([])

    const [reg,setreg] = useState(false)
    const [reg2,setreg2] = useState(true)
    const [reg3,setreg3] = useState(true)
    const [verseOutline,setOutline] = useState([])
    const [NABstate, setNAB] = useState([]);
    const [act,setact] = useState(false)
    const [bname,setbname] = useState()
    const [bchapter,setbchapter] = useState()
    const [bverse,setbverse] = useState()




    useEffect(() => {
      let NAB = require("../JSON/data.json");
  
      setNAB([...NABstate, NAB]);
    },[]);

  



          verseOutline.splice(0,verseOutline.length)
      NABstate.map(item => {
        let XMLBIBLE = item.XMLBIBLE;
  
        XMLBIBLE.map(item => {
          let bibleName = item.BIBLENAME;
          let bibleBooks = item.BIBLEBOOK;
  
       
          if (bibleName == bname) {
            let Verse = bibleBooks[parseInt(bchapter) - parseInt(1)].CHAPTER;
  
            for (let i = 0; i < Math.max(Verse.length); i++) {
             
              if (Verse[i]) {
                const versess = Verse[i].VERSE;
                verseOutline.push(versess)
              }
       }}})} )
          
  
    






    const filterKjv =()=>{
      // flow()
                kjv.splice(0,kjv.length)

        setreg2(false)
        setreg3(false)

setreg(true)
        sdisplay.filter(item=>{
            if(item.version =="[KJV]"){
                kjv.push(item)
                
            }
        })
    }

    const filterNab =()=>{
      // flow()
        nab.splice(0,nab.length)
setreg2(false)

setreg(false)
setreg3(true)
sdisplay.filter(item=>{
    if(item.version =="[NAB]"){
        nab.push(item)
    }
})
}

    const all =()=>{
      // flow()
        setreg2(true)
        setreg3(false)

setreg(false)
      
    }

    const check=(item)=>{
setbname(item.bibleBook)
setbchapter(item.chapterNumber)
setbverse(item.versenumber)
navigation.navigate('TextPage', {name:item.bibleBook, chapters:item.chapterNumber, verseOfScripture:item.versenumber, verseOutline:verseOutline})  
    }
   
  
    
    return(
        <>
        {/* {act && flo} */}
        <View>
            <Text style={{fontSize:15, marginVertical:9, borderColor:"white", borderBottomWidth:3}}>{"Search Keyword"+":"+" "+searches}</Text>
        </View>
        <View style={{justifyContent:"space-evenly", flexDirection:"row"}}>
          <Text style={{fontSize:27}}>FILTER:</Text>  
          <Button title="KJV"  onPress={filterKjv}/>
          <Button title="NAB"  onPress={filterNab}/>

            <Button title="ALL" onPress={all} />


        </View>
         <ScrollView style={{flex: 1}}>
        <View  style={{flex: 1}}>

            {
                reg &&
                kjv.map((item,index) => {
                    return (
                      <>
{
   
    <Text onPress={()=>navigation.navigate('TextPage', {name:item.bibleBook, chapters:item.chapterNumber, verseOfScripture:item.versenumber, verseOutline:verseOutline})} key={index} style={styles.list1}>{item.bibleBook+ " "+item.chapterNumber+ ":"+ item.versenumber+" "+ item.verse+"  "+ item.version}</Text>

}
                   
                      </>
                    );
                  })
            }

{
                reg3 &&
                nab.map((item,index) => {
                    return (
                      <>
{
    
   
    <Text onPress={()=>navigation.navigate('TextPage', {name:item.bibleBook, chapters:item.chapterNumber, verseOfScripture:item.versenumber, verseOutline:verseOutline})} key={index} style={styles.list3}>{item.bibleBook+ " "+item.chapterNumber+ ":"+ item.versenumber+" "+ item.verse+"  "+ item.version}</Text>

}
                   
                      </>
                    );
                  })
            }
          {reg2 &&
            sdisplay.map((item,index) => {
              return (
                <>
                


                                
{
    item.version == "[KJV]" &&
    <Text  key={index} onPress={()=>check(item)} style={styles.list1}>{item.bibleBook+ " "+item.chapterNumber+ ":"+ item.versenumber+" "+ item.verse+"  "+ item.version}</Text>

}               

{
    item.version == "[NAB]" &&
    <Text key={index} onPress={()=>navigation.navigate('TextPage', {name:item.bibleBook, chapters:item.chapterNumber, verseOfScripture:item.versenumber, verseOutline:verseOutline})} style={styles.list2}>{item.bibleBook+ " "+item.chapterNumber+ ":"+ item.versenumber+" "+ item.verse+"  "+ item.version}</Text>

}               


 </>
              );
            })}
        </View>
      </ScrollView>

      </>
    )
}


const styles = StyleSheet.create({


    list1: {
        color: "black",
        // alignItems:"flex-start"
        borderWidth: 2,
        backgroundColor: "pink",
        marginBottom: 1,
        paddingVertical:5,
        paddingHorizontal:5,
                borderColor: "white",
      },
      list2: {
        color: "black",
        // alignItems:"flex-start"
        borderWidth: 2,
        backgroundColor: "bisque",
        marginBottom: 1,
        paddingVertical:5,
        paddingHorizontal:5,        borderColor: "white",
      },
      list3: {
        color: "black",
        // alignItems:"flex-start"
        borderWidth: 2,
        backgroundColor: "bisque",
        marginBottom: 1,
        paddingVertical:5,
        paddingHorizontal:5,
        borderColor: "white",
      }
})