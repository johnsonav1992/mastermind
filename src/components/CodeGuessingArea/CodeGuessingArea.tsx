import styles from './CodeGuessingArea.module.css';

const CodeGuessingArea = () => {
  const rows = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <>
      {rows.map((row) => (
        <div className={styles.row} key={row}>
          <div className={styles.guess}>
            <div className="peg" />
            <div className="peg" />
            <div className="peg" />
            <div className="peg" />
          </div>
          <div className={styles.feedback}>
            <div className={styles.feedbackPeg} />
            <div className={styles.feedbackPeg} />
            <div className={styles.feedbackPeg} />
            <div className={styles.feedbackPeg} />
          </div>
        </div>
      ))}
    </>
  );
};

export default CodeGuessingArea;
