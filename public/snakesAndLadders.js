const moveToken = ({ currPos, name, color }) => {

  const parent = document.getElementById(name)?.parentElement;
  if (parent) {
    parent.innerText = null;
  }
  const token = playerToken(name, color);
  const newPos = document.getElementById(currPos);
  newPos.appendChild(token);
};

const getDiceFace = (diceValue) => {
  faces = [,
    'images/1face.jpg',
    'images/2face.jpg',
    'images/3face.jpg',
    'images/4face.jpg',
    'images/5face.jpg',
    'images/6face.jpg',
  ];
  return faces[diceValue];
};

const displayWin = () => {
  const winningMsg = document.querySelector('#winning-msg');
  console.log(winningMsg);
  winningMsg.style.visibility = 'visible';
};

const playerToken = (playerName, color) => {
  const token = document.createElement('div');
  token.id = playerName;
  token.style.background = color;
  token.style.height = '30px';
  token.style.width = '30px';
  token.style.borderRadius = '50%';
  return token;
};

const updateGame = (xhr) => () => {
  const dice = document.querySelector('#dice');
  const result = JSON.parse(xhr.response);
  dice.src = getDiceFace(result.diceValue);
  moveToken(result.player);

  if (result.gameOver) {
    displayWin()
  };
};

const rollDice = () => {
  console.log('clicked');
  const xhr = new XMLHttpRequest();
  xhr.onload = updateGame(xhr);
  xhr.open('get', '/roll')
  xhr.send();
};

const displayGame = (xhr, interval) => () => {
  const { positions, gameOver, currPlayer } = JSON.parse(xhr.response);
  const dice = document.getElementById('dice-msg');
  dice.innerText = `${currPlayer.name}'s turn`
  positions.forEach(moveToken);
  if (gameOver) {
    clearInterval(interval);
  }
};

const getStatus = () => {
  const interval = setInterval(() => {
    const xhr = new XMLHttpRequest();
    xhr.onload = displayGame(xhr, interval);
    xhr.open('get', '/status')
    xhr.send();
  }, 500);
};

const initGame = () => {
  console.log('in init');
  const dice = document.querySelector('#dice');
  dice.onclick = rollDice;
  getStatus();
};

window.onload = initGame;
