import { useEffect, useState } from 'react';
import data from "../data/words.json";

const offsetFromDate = new Date(2022,7,1);
const now = new Date();
const msOffset = now.getTime() - offsetFromDate.getTime();
const dayOffset = msOffset / 1000 / 60 / 60 / 24;


export const usePuzzleOfTheDay = () => {
    const [word, setWord] = useState<null | string>(null);
    useEffect(() => {
      const fetchData = () => {
        const todaysWord = Math.floor(dayOffset);
        setWord(data[todaysWord]);
      }
      fetchData();
    }, []);
  
    return word;
  };