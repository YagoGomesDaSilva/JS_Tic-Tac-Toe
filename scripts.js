let isCircleTurn;

const setQuerySelectors = () => {
  const cellElements = document.querySelectorAll('[data-cell]');
  const board = document.querySelector('[data-board]');
  const winningMessage = document.querySelector('[data-winning-message]');
  const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
  const restartButton = document.querySelector('[data-restart-button]');

  return { cellElements, board, winningMessage, winningMessageTextElement, restartButton };
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const makeBoard = () => {
  // Cria o elemento div com a classe 'board' e o atributo 'data-board'
  const boardDiv = document.createElement('div');
  boardDiv.className = 'board';
  boardDiv.setAttribute('data-board', '');

  // Adiciona as células ao boardDiv
  for (let i = 0; i < 9; i++) {
    const cellDiv = document.createElement('div');
    cellDiv.id = i.toString();
    cellDiv.className = 'cell';
    cellDiv.setAttribute('data-cell', '');

    // Adiciona a célula ao boardDiv
    boardDiv.appendChild(cellDiv);
  }

  // Adiciona o boardDiv ao corpo do documento
  document.body.appendChild(boardDiv);
};

const makeWinningMessage = () => {
  // Cria o elemento div com a classe 'winning-message' e o atributo 'data-winning-message'
  const winningMessageDiv = document.createElement('div');
  winningMessageDiv.className = 'winning-message';
  winningMessageDiv.setAttribute('data-winning-message', '');

  // Cria o elemento p com a classe 'winning-message-text' e o atributo 'data-winning-message-text'
  const winningMessageText = document.createElement('p');
  winningMessageText.className = 'winning-message-text';
  winningMessageText.setAttribute('data-winning-message-text', '');

  // Cria o elemento button com a classe 'winning-message-button' e o atributo 'data-restart-button'
  const restartButton = document.createElement('button');
  restartButton.className = 'winning-message-button';
  restartButton.setAttribute('data-restart-button', '');
  restartButton.textContent = 'Reiniciar!';

  // Adiciona o texto e o botão ao winningMessageDiv
  winningMessageDiv.appendChild(winningMessageText);
  winningMessageDiv.appendChild(restartButton);

  // Adiciona o winningMessageDiv ao corpo do documento
  document.body.appendChild(winningMessageDiv);
};

const startGame = () => {
  isCircleTurn = false;
  const { cellElements, winningMessage } = setQuerySelectors();

  for (const cell of cellElements) {
    cell.classList.remove('circle');
    cell.classList.remove('x');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
  const { winningMessageTextElement, winningMessage } = setQuerySelectors();

  if (isDraw) {
    winningMessageTextElement.innerText = 'Empate!';
  } else {
    winningMessageTextElement.innerText = isCircleTurn ? 'O Venceu!' : 'X Venceu!';
  }

  winningMessage.classList.add('show-winning-message');
};

const checkForWin = (currentPlayer) => {
  const { cellElements } = setQuerySelectors();
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  const { cellElements } = setQuerySelectors();

  // const cellElements = document.querySelectorAll("[data-cell]");
  return [...cellElements].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  const { board } = setQuerySelectors();

  board.classList.remove('circle');
  board.classList.remove('x');

  if (isCircleTurn) {
    board.classList.add('circle');
  } else {
    board.classList.add('x');
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const handleClick = (event) => {
  // Colocar a marca (X ou Círculo)
  const cell = event.target;
  const classToAdd = isCircleTurn ? 'circle' : 'x';

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

makeBoard();
makeWinningMessage();

startGame();

const restartButton = document.querySelector('[data-restart-button]');

restartButton.addEventListener('click', startGame);
