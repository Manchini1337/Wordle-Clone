import { GuessType, PuzzleWordCharCountType } from '../../data/types';
import SubmittedGuess from '../SubmittedGuess/SubmittedGuess';

interface SubmittedGuessesProps {
  submittedGuesses: GuessType[];
  puzzleOfTheDay: string;
  puzzleWordCharCount: PuzzleWordCharCountType;
}

const SubmittedGuesses: React.FC<SubmittedGuessesProps> = ({
  submittedGuesses,
  puzzleOfTheDay,
  puzzleWordCharCount,
}) => {
  return (
    <>
      {submittedGuesses.map((guess, i) => {
        return (
          <SubmittedGuess
            puzzleOfTheDay={puzzleOfTheDay}
            guess={guess}
            key={i}
            puzzleWordCharCount={puzzleWordCharCount}
          />
        );
      })}
    </>
  );
};

export default SubmittedGuesses;
