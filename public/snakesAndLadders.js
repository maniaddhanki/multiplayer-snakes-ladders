const moveToken = ({ currPos, newPos }) => {
  const presentPosition = currPos || 1;
  const currTile = document.getElementById(presentPosition);
  const newTile = document.getElementById(newPos);
  currTile.innerText = '';
  newTile.innerText = '⚫️';
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

const updateGame = (xhr) => () => {
  const dice = document.querySelector('#dice');
  const result = JSON.parse(xhr.response);
  dice.src = getDiceFace(result.diceValue);
  moveToken(result);

  if (result.gameOver) {
    displayWin()
  };
};

const rollDice = () => {
  const xhr = new XMLHttpRequest();
  xhr.onload = updateGame(xhr);
  xhr.open('get', '/roll')
  xhr.send();
};

const initGame = () => {
  const dice = document.querySelector('#dice');
  dice.onclick = rollDice;
};

window.onload = initGame; 