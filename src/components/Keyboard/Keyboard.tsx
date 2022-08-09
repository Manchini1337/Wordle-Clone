import classes from './Keyboard.module.css';

const keys = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'Enter',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  'Backspace',
];

interface KeyboardProps {
  handleKeyInput: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ handleKeyInput }) => {
  return (
    <div className={classes.key}>
      {keys.map((item, i) => (
        <button key={i} onClick={() => handleKeyInput(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
