// Constants for DOM elements
const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const resetButton = document.querySelector('#resetButton');

// Initial game state
let go = "circle";
infoDisplay.textContent = "Circle goes first!";

// Initial game board cells
const startCells = ["", "", "", "", "", "", "", "", ""];

// Function to create the game board
function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    });
}
createBoard();

// Function to handle a player's move
function addGo(e) {
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.innerHTML = `It is now <strong>${go}'s</strong> turn.`;
    e.target.removeEventListener("click", addGo);
    checkScore();
}

// Function to check the game score
function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Function to add the "winner" class to the winning squares
    function highlightWinner(combination) {
        combination.forEach(cell => {
            allSquares[cell].classList.add("winner");
        });
    }

    // Check for circle or cross wins
    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'));

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!";
            highlightWinner(array);
            allSquares.forEach(square => square.removeEventListener("click", addGo));
            return;
        }
    });

    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'));

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!";
            highlightWinner(array);
            allSquares.forEach(square => square.removeEventListener("click", addGo));
            return;
        }
    });

    // Function to reset the game
    function resetGame() {
        allSquares.forEach((square) => {
            square.innerHTML = '';
            square.classList.remove("winner");
        });

        go = "circle";
        infoDisplay.textContent = "Circle goes first!";
        startCells.forEach((cell, index) => {
            const cellElement = document.getElementById(index);
            cellElement.addEventListener('click', addGo);
        });
    }

    // Event listener for the reset button
    resetButton.addEventListener('click', resetGame);

    // Function to start the game
    function startGame() {
        window.location.href = "game.html";
    }

    // Function to navigate to the main menu
    function mainMenu() {
        window.location.href = "index.html"; // Replace with the actual main menu page URL
    }

    // Event listener for the "Go to Other Page" button
    const goToOtherPageButton = document.getElementById("goToOtherPage");
    goToOtherPageButton.addEventListener("click", mainMenu);
}
