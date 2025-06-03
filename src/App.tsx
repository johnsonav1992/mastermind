import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <h1>Mastermind</h1>
      <p>Can you crack the code?</p>
      <GameBoard />
    </div>
  );
}

export default App;
