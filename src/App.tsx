import GameBoard from './components/GameBoard/GameBoard';
import PegBucket from './components/PegBucket/PegBucket';

function App() {
  return (
    <div className="main-container">
      <h1>Mastermind</h1>
      <p>Can you crack the code?</p>
      <div className="board-container">
        <GameBoard />
        <div className="bucket-container">
          <PegBucket />
        </div>
      </div>
    </div>
  );
}

export default App;
