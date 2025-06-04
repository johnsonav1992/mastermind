import { pegColors } from '../../constants/pegColors';
import type { Peg } from '../../types/types';
import styles from './SecretCodeArea.module.css';

const SecretCodeArea = () => {
  const isGameInProgress = true;

  const pegs = Array.from(
    { length: 4 },
    () =>
      ({
        color: 'blue',
        isFilled: true
      }) as Peg
  );

  return (
    <div className={styles.codeRow}>
      {isGameInProgress ? (
        <div className={styles.codeCover} />
      ) : (
        <>
          {pegs.map((peg, i) => (
            <div
              key={i}
              className="peg"
              style={{ backgroundColor: pegColors[peg.color] }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
};

export default SecretCodeArea;
