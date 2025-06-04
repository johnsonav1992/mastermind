import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <div className="main-container">
      <h1>Mastermind</h1>
      <p>Can you crack the code?</p>
      <GameBoard />
    </div>
  );
}

export default App;
