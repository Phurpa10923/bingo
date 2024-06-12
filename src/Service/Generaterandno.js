export function pickAball(min,max,drawnNumbers){
    let number;
    do{
        number=Math.floor(Math.random()*(max-min+1))+min;
    }while(drawnNumbers.includes(number))
    return number;
}