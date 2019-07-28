//select board
const board = document.querySelector(".board");
//select marge line
const mergeLine = document.querySelector(".merge");
//select winning sound
const winningSound = document.querySelector(".winning-sound")

// pattern
const patterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
];
let playerTurn = 'x';
const checkedCellOfPlayerX = [];
const checkedCellOfPlayerO = [];


//add event listener to board
board.addEventListener("click", e => {
    const cellId = Number(e.target.getAttribute("data-cell-id"));

    // check cell id is in plyerX or plyerO
    if (!(checkedCellOfPlayerX.includes(cellId) || checkedCellOfPlayerO.includes(cellId))) {
        if (playerTurn === "x") {
            e.target.innerHTML = `<i class="fa fa-close"></i>`;
            checkedCellOfPlayerX.push(cellId);
            matchCheck(checkedCellOfPlayerX);
            //change player to O
            playerTurn = "o";
            document.querySelector('.turn').innerHTML = playerTurn.toUpperCase();

        } else if (playerTurn === "o") {
            e.target.innerHTML = `<i class="fa fa-circle-o"></i>`
            checkedCellOfPlayerO.push(cellId);
            matchCheck(checkedCellOfPlayerO)

            //change player to X
            playerTurn = "x";
            document.querySelector('.turn').innerHTML = playerTurn.toUpperCase();
        }
    }
});

function matchCheck(playerArr) {
    for (let k = 0; k < patterns.length; k++) {
        let hasIt = patterns[k].reduce((total, i) => total && playerArr.includes(i), true);
        if (hasIt) {
            winnerChecker(patterns[k])
        }
    }
    return false
}

function winnerChecker(patterns) {
    winningSound.play()
    const patternNum = patterns.join("")
    // add line and line color css class
    mergeLine.className += ` pattern${patternNum} player${playerTurn.toUpperCase()}Color`;
}