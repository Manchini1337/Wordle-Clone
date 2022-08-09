import classes from './CurrentGuess.module.css';
import { GuessType } from '../../data/types';

interface CurrentGuessProps {
  guess: GuessType;
}

const CurrentGuess: React.FC<CurrentGuessProps> = ({ guess }) => {
  return (
    <div className={classes.word}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <span className={classes.char} key={i}>
            {guess[i] || ''}
          </span>
        );
      })}
    </div>
  );
};

export default CurrentGuess;
