import React, { useState, useEffect } from 'react';
import generateSudokuBoard from './GenerateSudokuBoard';
import blankOutCells from './Blankout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import sudokuValidator from './Valid';
import './App.css';

const { checkBoard } = sudokuValidator;

function App() {
  const [completeBoard, setCompleteBoard] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [gameBoard, setGameBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [playerBoard, setPlayerBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [startTime, setStartTime] = useState(null); 
  const [stopTime, setStopTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null); 

  const startTimer = () => {
    setStartTime(Date.now());
    setStopTime(null); 
  };

  
  const stopTimer = () => {
    setStopTime(Date.now());
  };

  const calculateDuration = () => {
      const duration = (stopTime - startTime) / 1000; 
      setTotalTime(duration.toFixed(2)); 
    
  };

  useEffect(() => {
   
    if (startTime && stopTime) {
      calculateDuration();
    }
  }, [stopTime, startTime]);

  const createBoard = () => {
    const newBoard = generateSudokuBoard();
    setCompleteBoard(newBoard);
    const blankedBoard = blankOutCells(newBoard, difficulty);
    setGameBoard(blankedBoard);
    setPlayerBoard(blankedBoard.map(row => [...row]));
    startTimer(); 
  };

  const showSolution = () => {
    setPlayerBoard(completeBoard.map(row => [...row])); 
   
  };

  const checkSolved = () => {
    const isSolved = checkBoard(playerBoard);
    
    if (isSolved) {
      stopTimer();
      calculateDuration();
      alert(`You solved the puzzle in ${totalTime} seconds!`);
    } else {
      alert("The puzzle is not solved yet. You should go flip burgers!");
    }
  };

  const addNumber = (e) => {
    const row = parseInt(e.target.getAttribute('data-row'), 10);
    const col = parseInt(e.target.getAttribute('data-column'), 10);
    const value = e.target.value;

    if (value === '' || (value >= 1 && value <= 9)) {
      setPlayerBoard((prevBoard) => {
        const updatedBoard = prevBoard.map((r) => [...r]); 
        updatedBoard[row][col] = value ? parseInt(value, 10) : 0; 
        return updatedBoard;
      });
    }
  };

  return (
    <div>
      <div>This is my Sudoku app</div>

      {/* Dropdown for difficulty selection */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)} 
          style={{ height: '40px', fontSize: '16px', marginRight: '10px' }}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Difficult">Difficult</option>
          <option value="Expert">Expert</option>
        </select>
        <Button
          variant="primary"
          style={{
            backgroundColor: '#1a4099',
            height: '40px',
            color: 'white'
          }}
          onClick={createBoard}
        >
          Create New Board
        </Button>
      </div>

      <Container className="sudoku-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="row">
            {Array.from({ length: 9 }, (_, j) => {
              const value = playerBoard[i][j];
              const isEditable = gameBoard[i][j] === 0;

              return (
                <input
                  key={j}
                  className={`cell ${isEditable ? '' : 'readonly'}`}
                  data-row={i}
                  data-column={j}
                  value={value === 0 ? '' : value}
                  type="text"
                  readOnly={!isEditable}
                  onChange={isEditable ? addNumber : undefined}
                  onInput={(e) => {
                    if (!/^[1-9]?$/.test(e.target.value)) {
                      e.preventDefault();
                    }
                  }}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                />
              );
            })}
          </div>
        ))}
      </Container>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button
          variant="primary"
          style={{
            backgroundColor: 'green',
            height: '50px',
            width: '150px',
            color: 'white',
            marginRight: '10px'
          }}
          onClick={checkSolved} 
        >
          Solved
        </Button>
        <Button
          variant="primary"
          style={{
            backgroundColor: 'grey',
            height: '50px',
            width: '150px',
            color: 'white',
          }}
          onClick={showSolution}
        >
          Show Solution
        </Button>
      </div>
    </div>
  );
}

export default App;