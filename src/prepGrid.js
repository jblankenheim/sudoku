import { useState } from "react";
const prepGrid = (currentGrid, numberOfCells) => {


    const newGrid = [...currentGrid];
    const indicesToBlank = new Set();
  
    while (indicesToBlank.size < numberOfCells) {
      const randomIndex = Math.floor(Math.random() * 81);
      indicesToBlank.add(randomIndex);
    }
  
    indicesToBlank.forEach((index) => {
      newGrid[index] = 0;
    });
  
    
    return newGrid; 
};

export default prepGrid;