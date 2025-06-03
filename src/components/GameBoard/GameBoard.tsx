import CodeGuessingArea from '../CodeGuessingArea/CodeGuessingArea';
import SecretCodeArea from '../SecretCodeArea/SecretCodeArea';
import styles from './GameBoard.module.css';

const GameBoard = () => {
  return (
    <div className={styles.gameBoardOuter}>
      <SecretCodeArea />
      <CodeGuessingArea />
    </div>
  );
};

export default GameBoard;
