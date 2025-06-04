import { useAtom } from 'jotai';
import CodeGuessingArea from '../CodeGuessingArea/CodeGuessingArea';
import PegBucket from '../PegBucket/PegBucket';
import SecretCodeArea from '../SecretCodeArea/SecretCodeArea';
import styles from './GameBoard.module.css';
import { gameStateAtom } from '../../state/atoms';

const GameBoard = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center'
      }}
    >
      <div className={styles.gameBoardOuter}>
        <SecretCodeArea />
        <CodeGuessingArea />
      </div>
      {gameState === 'notStarted' ? (
        <button onClick={() => setGameState('playing')}>Start Game</button>
      ) : (
        <PegBucket />
      )}
    </div>
  );
};

export default GameBoard;
