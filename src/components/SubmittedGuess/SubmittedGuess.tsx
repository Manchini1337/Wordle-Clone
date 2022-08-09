import { GuessType, PuzzleWordCharCountType } from '../../data/types';
import classes from './SubmittedGuess.module.css';

interface SubmittedGuessProps {
  guess: GuessType;
  puzzleOfTheDay: string;
  puzzleWordCharCount: PuzzleWordCharCountType;
}

const SubmittedGuess: React.FC<SubmittedGuessProps> = ({
  guess,
  puzzleOfTheDay,
  puzzleWordCharCount,
}) => {
  const charMap = { ...puzzleWordCharCount };

  guess.forEach((guessChar, i) => {
    const isCorrect = puzzleOfTheDay[i] === guessChar;
    if (isCorrect) {
      charMap[guessChar] -= 1;
    }
  });

  return (
    <div className={classes.word}>
      {guess.map((guessChar, i) => {
        const puzzleChar = puzzleOfTheDay[i];
        const isCorrect = guessChar === puzzleChar;

        let isPresent = false;
        if (!isCorrect && charMap[guessChar]) {
          isPresent = true;
          charMap[guessChar] -= 1;
        }

        return (
          <span
            className={`${classes.char} ${
              isCorrect ? classes.correctChar : ''
            } ${isPresent ? classes.presentChar : ''} ${classes.guessedChar}`}
            key={i}
          >
            {guessChar}
          </span>
        );
      })}
    </div>
  );
};

export default SubmittedGuess;
