const board = document.getElementById('board');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const slots = [
    document.getElementById('slot-1'),
    document.getElementById('slot-2'),
    document.getElementById('slot-3')
];

const N = 10; // Columns
const M = 10; // Rows
const basePoint = 10;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
highScoreElement.textContent = `High Score: ${highScore}`;

// Initialize board
const boardState = Array.from({ length: M }, () => Array(N).fill(null));
function initializeBoard() {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
            if (Math.random() < 0.5) {
                cell.style.backgroundColor = getRandomColor();
                boardState[i][j] = { multiplier: 1 };
            }
        }
    }
}

function getRandomColor() {
    const colors = ['#ff9999', '#99ff99', '#9999ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate random blocks
function generateRandomBlock() {
    const types = [
        { shape: [[1]], multiplier: getRandomMultiplier() },
        { shape: [[1, 1]], multiplier: getRandomMultiplier() },
        { shape: [[1], [1]], multiplier: getRandomMultiplier() },
        { shape: [[1, 1], [1, 1]], multiplier: getRandomMultiplier() }
    ];
    return types[Math.floor(Math.random() * types.length)];
}

function getRandomMultiplier() {
    return Math.floor(Math.random() * 3) + 1;
}

function updateScore(points) {
    score += points;
    scoreElement.textContent = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = `High Score: ${highScore}`;
        localStorage.setItem('highScore', highScore);
    }
}

initializeBoard();
