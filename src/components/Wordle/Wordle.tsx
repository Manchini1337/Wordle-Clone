import React, { useEffect, useState, useCallback } from 'react';
import classes from './Wordle.module.css';
import Keyboard from '../Keyboard/Keyboard';
import EmptyGuess from '../EmptyGuess/EmptyGuess';
import CurrentGuess from '../CurrentGuess/CurrentGuess';
import SubmittedGuesses from '../SubmittedGuesses/SubmittedGuesses';
import { usePuzzleOfTheDay } from '../../hooks/usePuzzleOfTheDay';
import { useCharCountMap } from '../../hooks/useCharCountMap';
import { GuessType } from '../../data/types';

const maxGuessAmount = 6;

const Wordle: React.FC = () => {
  const [guess, setGuess] = useState<GuessType>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessType[]>([]);

  const puzzleOfTheDay = usePuzzleOfTheDay();
  const puzzleWordCharCount = useCharCountMap(puzzleOfTheDay);

  console.log(puzzleOfTheDay);

  const isCorrect =
    submittedGuesses.length > 0 &&
    submittedGuesses[submittedGuesses.length - 1].join('') === puzzleOfTheDay;

  const isFailure = !isCorrect && submittedGuesses.length === maxGuessAmount;

  const handleKeyInput = useCallback(
    (key: string) => {
      const isChar = /^[a-z]$/.test(key);
      const isBackspace = key === 'Backspace';
      const isEnter = key === 'Enter';
      const isGuessFinished = guess.length === 5;

      if (isFailure || isCorrect) return;

      if (isBackspace && guess.length > 0) {
        setGuess((prevState) => {
          const temp = [...prevState];
          temp.pop();
          return temp;
        });
      } else if (isChar && !isGuessFinished) {
        setGuess((prevState) => [...prevState, key]);
      } else if (isGuessFinished && isEnter) {
        setSubmittedGuesses((prevState) => [...prevState, guess]);
        setGuess([]);
      }
    },
    [guess, isFailure, isCorrect]
  );

  useEffect(() => {
    const handleKeyDown = ({ key }: { key: string }) => {
      handleKeyInput(key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guess.length, guess, handleKeyInput]);

  if (puzzleOfTheDay === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.wordle}>
      <div className={classes.title}>
        <h1>Wordle</h1>
      </div>
      <div className={classes.board}>
        <SubmittedGuesses
          submittedGuesses={submittedGuesses}
          puzzleOfTheDay={puzzleOfTheDay}
          puzzleWordCharCount={puzzleWordCharCount}
        />
        {!isFailure && !isCorrect && <CurrentGuess guess={guess} />}

        {Array.from({
          length:
            maxGuessAmount - submittedGuesses.length - (isCorrect ? 0 : 1),
        }).map((_, i) => {
          return <EmptyGuess key={i} />;
        })}
        {isCorrect && (
          <div className={classes.message}>You did it! Congratulations.</div>
        )}
        {isFailure && (
          <div className={classes.message}>
            Oh no! The puzzle: {puzzleOfTheDay}
          </div>
        )}
      </div>
      <Keyboard handleKeyInput={handleKeyInput} />
    </div>
  );
};

export default Wordle;
