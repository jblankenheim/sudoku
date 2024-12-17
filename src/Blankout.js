function blankOutCells(grid, difficulty) {
    let numberOfCells;
    switch (difficulty) {
        case 'Easy':
            numberOfCells = 30;
            break;
        case 'Medium':
            numberOfCells = 40; 
            break;
        case 'Difficult':
            numberOfCells = 50; 
            break;
        case 'Expert':
            numberOfCells = 60; 
            break;
        default:
            numberOfCells = 40; 
    }

    
    const newGrid = grid.map(row => [...row]);

    const indicesToBlank = new Set();
    while (indicesToBlank.size < numberOfCells) {
        const randomIndex = Math.floor(Math.random() * 81); 
        indicesToBlank.add(randomIndex);
    }

    indicesToBlank.forEach(index => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        newGrid[row][col] = 0; 
    });

    return newGrid; 
}

export default blankOutCells;