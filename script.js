const rows = 6;
const cols = 8;
const board = [];
let first = null;
let second = null;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function createBoard() {
  const icons = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍒', '🥝', '🥑', '🍅', '🍉', '🌽', '🍆'];
  let pairs = [];
  for (let i = 0; i < (rows * cols) / 2; i++) {
    const icon = icons[i % icons.length];
    pairs.push(icon, icon);
  }
  shuffle(pairs);

  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      const icon = pairs.pop();
      cell.classList.add('cell');
      cell.textContent = icon;
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.dataset.icon = icon;
      board[r][c] = { icon, element: cell };
      cell.addEventListener('click', () => selectCell(cell, r, c));
      gameBoard.appendChild(cell);
    }
  }
}

function selectCell(cell, r, c) {
  if (!first) {
    first = { cell, r, c };
    cell.classList.add('selected');
  } else if (!second && cell !== first.cell) {
    second = { cell, r, c };
    cell.classList.add('selected');
    checkMatch();
  }
}

function checkMatch() {
  const icon1 = first.cell.dataset.icon;
  const icon2 = second.cell.dataset.icon;

  if (icon1 === icon2) {
    // Logic nối đường đi đơn giản hóa (ko check chướng ngại)
    first.cell.style.visibility = 'hidden';
    second.cell.style.visibility = 'hidden';
  }

  first.cell.classList.remove('selected');
  second.cell.classList.remove('selected');
  first = null;
  second = null;
}

createBoard();
