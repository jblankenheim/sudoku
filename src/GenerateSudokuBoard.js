import sudokuValidator from "./Valid"; 
const { isValid } = sudokuValidator; 

function generateSudokuBoard() {
    let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    
    function fillGrid() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    shuffleArray(numbers);
                    for (let num of numbers) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;

                            if (fillGrid()) {
                                return true;
                            } else {
                                grid[row][col] = 0; 
                            }
                        }
                    }
                    return false; 
                }
            }
        }
        return true; 
    }

    fillGrid();
    
    return grid; 
}

export default generateSudokuBoard;