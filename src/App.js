import React, {useState, useEffect} from 'react';

import './App.css';

const colors = {
  1: 'green',
  2: 'red',
  3: 'yellow',
  4: 'blue'
};

function App(){
  const [status, setStatus] = useState('Pressione JOGAR para iniciar'); 
  const [color, setColor] = useState('red'); 
  const [startButtonPressed, setStartButtonPressed] = useState(false);
  const [startCountdown, setStartCountdown] = useState(3);

  const [round, setRound] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [flashIntervalTime, setFlashIntervalTime] = useState(1000); 
  const [displayRoundTime, setDisplayRoundTime] = useState(0); 
  const [gameArray, setGameArray] = useState([]); 

  const [buttonFlash, setButtonFlash] = useState(false); 

  const [pressedButton, setPressedButton] = useState('');
  const [flashingButton, setFlashingButton] = useState('');
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);

  const [gameLoseCountdown, setGameLoseCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Limpa o intervalo de contagem regressiva atual, quando um novo intervalo é criado. 
  useEffect(() => {
    let intervalId;

    if (isCountingDown) {
      intervalId = setInterval(() => {
        setGameLoseCountdown((prevCountDown) => {
          if (prevCountDown <= 1) {
            clearInterval(intervalId); 
            return 0;
          }
          return prevCountDown - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCountingDown]);

  function gameStart() {
    setIsButtonClickable(false);
    stopGameLoseCountdown(); 

    setStartButtonPressed(true);    
    setStartCountdown(3);
    setCurrentScore(0);
    setColor('green');
    setStatus('Carregando...');

    let intervalId = setInterval(() => {
      setStartCountdown((prevCountdown) => {
        if (prevCountdown - 1 === 0) {
          setStatus('Início do jogo');
          clearInterval(intervalId); 
        }
        return prevCountdown - 1;
      }); 
    }, 1000);  
   
    setTimeout(() => {
      displayRound();
    }, 4500);

  };

  function displayRound () {   
    setIsButtonClickable(false); 
    stopGameLoseCountdown(); 
    setInputIndex(0);

    const startTime = Date.now();
  
    setGameArray(prevArray => {
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      const newArray = [...prevArray, randomNumber];
      const newRound = newArray.length;
      setRound(newRound); 

      let newFlashIntervalTime = 1000;
      if (newRound >= 5 && newRound <= 8) {
        newFlashIntervalTime = 800;
      } else if (newRound >= 9 && newRound <= 12) {
        newFlashIntervalTime = 600;
      } else if (newRound >= 13) {
        newFlashIntervalTime = 400;
      }
      setFlashIntervalTime(newFlashIntervalTime);  

      function flashButtonMovie (index) {        
        if (index < newRound) {
          setFlashingButton(colors[newArray[index]]);
          setTimeout(() => setFlashingButton(''), 200);
  
          setTimeout(() => flashButtonMovie(index + 1), newFlashIntervalTime);
        }

        if (index === newRound - 1) {
          setTimeout(() => {
            const endTime = Date.now();
            setDisplayRoundTime(endTime - startTime + newFlashIntervalTime - 200); 

            setTimeout(() => {
              setIsButtonClickable(true); 
            }, 1000); 

            setTimeout(() => {
              stopGameLoseCountdown();
              beginGameLoseCountdown(); 
            }, 500); 
          }, 200);
        }
      };
  
      flashButtonMovie(0);
  
      return newArray;
    });
  };

  function gameOver () {
    setStatus('Jogo perdido');
    setColor('red');
    setIsButtonClickable(false); 
    stopGameLoseCountdown(); 

    setRound(0);
    setGameArray([]);
    setFlashIntervalTime(1000);
    setDisplayRoundTime(0);
    setInputIndex(0);

    let flashes = 10;  
    function gameOverMovie () {
      setButtonFlash(prev => !prev); 
      flashes--; 
  
      if (flashes > 0) {
        setTimeout(gameOverMovie, 200);
      } else {
        setStartButtonPressed(false);
        alert('Game Over! Sua pontuação: ' + currentScore);
      }
    };
  
    gameOverMovie(); 
  };

  function handleButtonClick(number) {
    if (!isButtonClickable) return; 
    
    setPressedButton(colors[number]);
    setTimeout(() => setPressedButton(''), 200); 

    stopGameLoseCountdown();
    beginGameLoseCountdown(); 

    if (gameArray[inputIndex] === number) {
      setInputIndex(prevIndex => prevIndex + 1);

      setCurrentScore(prevCount => {
        const newCount = prevCount + 1;
        setHighestScore(prevHighScore => Math.max(prevHighScore, newCount));
        return newCount; 
      });
  
      if (inputIndex + 1 === round) {
        setIsButtonClickable(false);
        setTimeout(() => {
          displayRound();
        }, 1000); 
      }  
    } else {
      gameOver();
    }
  }

  function beginGameLoseCountdown () {
    setIsCountingDown(true);
    setGameLoseCountdown(5);
  };
  function stopGameLoseCountdown () {
    setIsCountingDown(false);
    setGameLoseCountdown(5);
  };


  // Aciona o game over quando a contagem regressiva chega a 0
  useEffect(()=>{    
    if(gameLoseCountdown ===0) gameOver();
  },[gameLoseCountdown])  

  return(
    <div className="app">
      <div className="section-game">
        <h1 className="title">Genius Game</h1>
        <div className="text">{status}</div>
        <div className = "genius">
          <div className = "game">
            <button className={`press green
              ${buttonFlash || flashingButton === 'green' || pressedButton === 'green' ? 'flash' : ''}
              ${!isButtonClickable ? 'disabled' : ''}`}
              onClick={() => handleButtonClick(1)}
              disabled={!isButtonClickable}> 
            </button>
            <button className={`press red
              ${buttonFlash || flashingButton === 'red' || pressedButton === 'red' ? 'flash' : ''}
              ${!isButtonClickable ? 'disabled' : ''}`}
              onClick={() => handleButtonClick(2)}
              disabled={!isButtonClickable}> 
            </button>
            <button className={`press yellow
              ${buttonFlash || flashingButton === 'yellow' || pressedButton === 'yellow' ? 'flash' : ''}
              ${!isButtonClickable ? 'disabled' : ''}`}
              onClick={() => handleButtonClick(3)}
              disabled={!isButtonClickable}> 
            </button>
            <button className={`press blue
              ${buttonFlash ||flashingButton === 'blue' || pressedButton === 'blue' ? 'flash' : ''}
              ${!isButtonClickable ? 'disabled' : ''}`}
              onClick={() => handleButtonClick(4)}
              disabled={!isButtonClickable}> 
            </button>

            <div className = "score-bar">
              <button className="score-board">{highestScore < 10 ? `0${highestScore}` : highestScore}</button>
              <button className={`score-board button ${startButtonPressed ? 'disabled' : ''}`} 
                onClick={gameStart} 
                disabled={startButtonPressed}>
                  jogar
              </button>
              <button className="score-board">{currentScore < 10 ? `0${currentScore}` : currentScore}</button>
            </div>          
            <div className="indicator"
            style={{ backgroundColor: color }}></div> 
          </div>
        </div>
        <div className="text">{gameLoseCountdown} segundos</div> 
      </div>

      <div className="section-score">
        <div className="text-title">Round: {round}</div>

        {startButtonPressed && startCountdown > 0 ? startCountdown : ''} 

        <div className="text-title">Intervalo: {flashIntervalTime}ms</div> 
        <div className="text-title">Tempo do Round: {displayRoundTime}ms</div>  
      </div>
    </div>    
  )
}

export default App;