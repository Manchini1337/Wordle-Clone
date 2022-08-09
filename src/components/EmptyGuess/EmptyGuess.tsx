import classes from './EmptyGuess.module.css';

const EmptyGuess: React.FC = () => {
  return (
    <div className={classes.word}>
      {Array.from({ length: 5 }).map((_, i) => {
        return <span className={classes.char} key={i} />;
      })}
    </div>
  );
};

export default EmptyGuess;
