import { useState, useEffect } from "react";
import { Bishop } from "./asvs";

export function Vw({
  bibleNamer,
  chapter,
  AMPscan,
  AMPscanLength,
  scanner,
  scannerLength,
  bibleName,
  CahapterNumbering
}) {
  const [VWversion, setVWversion] = useState([]);
  const [VWscan, setVWscan] = useState([]);

  useEffect(() => {
    const data = require("../concept/JSON/realAmp.json");
    setVWversion([...VWversion,data]);
  }, []);

  useEffect(() => {
    const scanResults = [];

    VWversion.forEach(item => {
      const XMLBIBLE = item.XMLBIBLE;
      XMLBIBLE.forEach(item => {
        const BIBLEBOOK = item.BIBLEBOOK;
        BIBLEBOOK.forEach(item => {
          const CHAPTER = item.CHAPTER;
          CHAPTER.forEach(item => {
            if (item.BOOKNAME === bibleNamer && CHAPTER[chapter]) {
              const shake = CHAPTER[chapter].VERS;
              shake.forEach(verse => {
                scanResults.push(verse);
              });
            }
          });
        });
      });
    });

    setVWscan(scanResults);
  }, [VWversion, bibleNamer, chapter]);

  return (
    <>
      <Bishop
        VWscan={VWscan}
        VWscanLength={VWscan.length}
        AMPscan={AMPscan}
        chapters={chapter}
        bibleNamer={bibleNamer}
        AMPscanLength={AMPscanLength}
        scanner={scanner}
        scannerLength={scannerLength}
        bibleName={bibleName}
        CahapterNumbering={CahapterNumbering}
      />
    </>
  );
}
