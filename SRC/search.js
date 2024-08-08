  import {useEffect, useState} from "react";
import {Text, ScrollView, View, StyleSheet, Button} from "react-native";
import { SearchPasser } from "./SearchPasser";




export function Search({route, navigation}) {

 
  const {searches} = route.params;
  

  const [kjv, setkjv] = useState([]);
  const [nab, setnab] = useState([]);
  const [passer,setpasser] = useState(false)

  const [reg, setreg] = useState();
  const [reg2, setreg2] = useState(true);
  const [reg3, setreg3] = useState();
  const [verseOutline, setOutline] = useState([]);
  const [NABstate, setNAB] = useState([]);
  const [act, setact] = useState(false);
  const [bname, setbname] = useState();
  const [bchapter, setbchapter] = useState();
  const [bverse, setbverse] = useState();
  const [sdisplayer, setdisplayer] = useState([]);
  const [getKjv, setKjv] = useState([]);
  const [search2, setseatch2] = useState([]);

  useEffect(() => {
    let NAB = require("../JSON/data.json");

    setNAB([...NABstate, NAB]);

    let data = require("../JSON/kjv.json");
    setKjv([...getKjv, data]);




  }, []);



  useEffect(() => {
    const temArr = [];
    getKjv.forEach(item => {
      let whole = item.verses;
      whole.forEach(verse => {
        let bookname = verse.book_name;
        let chapter = verse.chapter;
        let text = verse.text;
        if (bookname && chapter) {
          temArr.push(verse);
        }

      });
    });
    setseatch2(temArr);


  }, [getKjv]);


sdisplayer.splice(0,sdisplayer.length)


  verseOutline.splice(0, verseOutline.length);
  NABstate.map(item => {
    let XMLBIBLE = item.XMLBIBLE;

    XMLBIBLE.map(item => {
      let bibleName = item.BIBLENAME;
      let bibleBooks = item.BIBLEBOOK;

      if (bibleName == bname) {
        
  // chapterLength.push(CHAPTER)
        let Verse = bibleBooks[parseInt(bchapter) - parseInt(1)].CHAPTER;

        for (let i = 0; i < Math.max(Verse.length); i++) {
          if (Verse[i]) {
            const versess = Verse[i].VERSE;
            verseOutline.push(versess);
          }
        }
      }
    });
  });

  NABstate.map(item => {
    let XMLBIBLE = item.XMLBIBLE;

    XMLBIBLE.map(item => {
      let bibleBook = item.BIBLENAME;
      let BIBLEBOOK = item.BIBLEBOOK;

      if (searches) {
        for (let i = 0; i < BIBLEBOOK.length; i++) {
          let mmm = BIBLEBOOK[i].CHAPTER;
          let chapterNumber = BIBLEBOOK[i].CHAPTERNUMBER;
          mmm.filter(item => {
            // console.log(item.VERSE);
            let verse = item.VERSE;
            let versenumber = item.VERSENUMBER;
            if (
              verse &&
              verse.toLowerCase().includes(searches.toLowerCase())
            ) {
              sdisplayer.push({
                verse: verse,
                bibleBook: bibleBook,
                chapterNumber: chapterNumber,
                versenumber: versenumber,
                version: "[NAB]",
              });
            }
          });
        }
      }
    });
  })


  
      

    search2.filter(item => {
      if (
        item &&
        item.text.toLowerCase().includes(searches.toLowerCase())
      ) {
        sdisplayer.push({
          verse: item.text,
          bibleBook: item.book_name,
          chapterNumber: item.chapter,
          versenumber: item.verse,
          version: "[KJV]",
        });
      }
    })
  


  const filterKjv = () => {
    // flow()

    setreg2(false);
    setreg3(false);

    setreg(true);
  };

  const filterNab = () => {
    setreg2(false);

    setreg(false);
    setreg3(true);
  };

  const all = () => {
    // flow()
    setreg2(true);
    setreg3(false);

    setreg(false);
  };

  const check = item => {
setpasser(true)

    setbname(item.bibleBook);
    setbchapter(item.chapterNumber);
    setbverse(item.versenumber);

  
};

















  
  return (
    <>

   {passer == true &&  <SearchPasser navigation={navigation} name={bname} chapters={bchapter} verseOfScripture={bverse} verseOutline={verseOutline} numbers={9}  /> }


{
  setTimeout(() => {
      {setpasser(false)} 

  }, 500)
}

  
   

     
      <View>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 9,
            borderColor: "white",
            borderBottomWidth: 3,
          }}
        >
          {"Search Keyword" + ":" + " " + searches}
        </Text>
      </View>
      <View style={{justifyContent: "space-evenly", flexDirection: "row"}}>
        <Text style={{fontSize: 27}}>FILTER:</Text>
        <Button title="KJV" onPress={filterKjv} />
        <Button title="NAB" onPress={filterNab} />

        <Button title="ALL" onPress={all} />
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {reg &&
            sdisplayer.map((item, index) => {
              return (
                <>
                  {item.version == "[KJV]" && (
                    <Text
                      key={index}
                      onPress={() => check(item)   }
                      style={styles.list1}
                    >
                      {item.bibleBook +
                        " " +
                        item.chapterNumber +
                        ":" +
                        item.versenumber +
                        " " +
                        item.verse +
                        "  " +
                        item.version}
                    </Text>
                  )}
                </>
              );
            })}
          {reg3 &&
            sdisplayer.map((item, index) => {
              return (
                <>
                  {item.version == "[NAB]" && (
                    <Text
                      key={index}
                      onPress={() => check(item)}
                      style={styles.list2}
                    >
                      {item.bibleBook +
                        " " +
                        item.chapterNumber +
                        ":" +
                        item.versenumber +
                        " " +
                        item.verse +
                        "  " +
                        item.version}
                    </Text>
                  )}
                </>
              );
            })}

          {reg2 &&

            sdisplayer.map((item, index) => {
              return (
                <>
                  {item && item.version == "[KJV]" && (
                    <Text
                      key={index}
                      onPress={()=> check(item) }

                      
              
                      style={styles.list1}
                    >
                      {item.bibleBook +
                        " " +
                        item.chapterNumber +
                        ":" +
                        item.versenumber +
                        " " +
                        item.verse +
                        "  " +
                        item.version}
                    </Text>
                  )}

                  {item.version == "[NAB]" && (
                    <Text
                      key={index}
                      onPress={() => check(item)
                       
                      }
                      style={styles.list2}
                    >
                      {item.bibleBook +
                        " " +
                        item.chapterNumber +
                        ":" +
                        item.versenumber +
                        " " +
                        item.verse +
                        "  " +
                        item.version}
                    </Text>
                  )}
                </>
              );
            })
            
            }
        </View>
      </ScrollView>


    </>
  );
}

const styles = StyleSheet.create({
  list1: {
    color: "black",
    // alignItems:"flex-start"
    borderWidth: 2,
    backgroundColor: "pink",
    marginBottom: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: "white",
  },
  list2: {
    color: "black",
    // alignItems:"flex-start"
    borderWidth: 2,
    backgroundColor: "bisque",
    marginBottom: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: "white",
  },
  list3: {
    color: "black",
    // alignItems:"flex-start"
    borderWidth: 2,
    backgroundColor: "bisque",
    marginBottom: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: "white",
  },
});
