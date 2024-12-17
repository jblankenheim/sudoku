function isValid(grid, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) return false;
    }

    /// Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) return false;
    }

    // Check box
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[boxRow + i][boxCol + j] === num) return false;
        }
    }

    return true;
}
function checkBoard(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = grid[row][col];
            console.log(`Checking cell at (${row}, ${col}): ${num}`); 
            if (num !== 0) { 
                // remove number to skip self-validation
                const originalValue = num;
                grid[row][col] = 0; // Set the current cell to 0

               // // Check if the number is valid in the current position
                if (!isValid(grid, row, col, originalValue)) {
                    console.log(`Invalid number found: ${originalValue} at (${row}, ${col})`); 
                    return false; 
                }

                
                grid[row][col] = originalValue;
            }
        }
    }
    return true; // All checks passed
}



const sudokuValidator = { isValid, checkBoard };

export default sudokuValidator;