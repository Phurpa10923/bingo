
export const generateTicket = (typeofticket,noofticket)=>{
    if(typeofticket==='ticket'){
        const ticket = Array.from({length:noofticket||1},()=>{
            return generateBingoTicket();
        })
        return ticket;
    }else{
        const ticketSheets  = Array.from({length:6},()=>{
            return generateBingoTicket();
        })
        return ticketSheets;
    }
}
function generateBingoTicket() {
    // Initialize a 3x9 array filled with zeros
    let ticket = Array.from({ length: 3 }, () => Array(9).fill(0));

    // Helper function to generate a random number within a range
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Array to keep track of numbers that have already been used
    let usedNumbers = Array.from({ length: 9 }, () => new Set());

    // Fill each column with the appropriate range of numbers
    for (let col = 0; col < 9; col++) {
        let start = col * 10 + (col === 0 ? 1 : 0);
        let end = col * 10 + 9;
        let columnNumbers = [];

        // Ensure unique numbers within the column
        while (columnNumbers.length < 3) {
            let num = getRandomNumber(start, end);
            if (!usedNumbers[col].has(num)) {
                usedNumbers[col].add(num);
                columnNumbers.push(num);
            }
        }

        // Sort the column numbers in ascending order
        columnNumbers.sort((a, b) => a - b);

        // Assign sorted numbers to the ticket
        for (let row = 0; row < 3; row++) {
            ticket[row][col] = columnNumbers[row];
        }
    }

    // Randomly set some numbers to 0 (empty spots)
    for (let row = 0; row < 3; row++) {
        let emptySpots = 4;  // Each row should have exactly 4 empty spots
        while (emptySpots > 0) {
            let col = getRandomNumber(0, 8);
            if (ticket[row][col] !== 0) {
                ticket[row][col] = 0;
                emptySpots--;
            }
        }
    }

    return ticket;
}

