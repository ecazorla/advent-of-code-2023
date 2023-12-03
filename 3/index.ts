import fs from 'fs';

const isNumber = (text: string): boolean => {
    return Number.isInteger(parseInt(text));
}

const hasSymbol = (matrix: any, i: number, j: number): boolean => {
    const positions = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];

    const isSymbol = (char: string): boolean => {
        return !!char && !isNumber(char) && char !== '.'
    }

    for (let i = 0; i < positions.length; i++) {
        if (isSymbol((matrix[positions[i][0]] || [])[positions[i][1]])) {
            return true;
        }
    }

    return false;
}

const mainOne = (): any => {
    const matrix = fs.readFileSync('data').toString().split('\n').map((line) => {
        return line.split('');
    });

    const numbersArray: number[] = [];
    for (let i = 0; i < matrix.length; i++) {
        let line = matrix[i];
        let numberBuffer = '';
        let numberIsValid = false;
        for (let j = 0; j < line.length; j++) {
            if (isNumber(line[j])) {
                numberBuffer += line[j];
    
                if (!numberIsValid && hasSymbol(matrix, i, j)) {
                    numberIsValid = true;
                }

                if (j !== line.length - 1) {
                    continue;
                }
            }
    
            if (numberBuffer !== '') {
                if (numberIsValid) {
                    numbersArray.push(parseInt(numberBuffer));
                }
            }
    
            numberBuffer = '';
            numberIsValid = false;
        }
    }

    return numbersArray.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}

console.log(mainOne());

// part 2
const hasStar = (matrix: any, i: number, j: number): any => {
    const positions = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
    let starsFound: string[] = [];
    for (let i = 0; i < positions.length; i++) {
        if ((matrix[positions[i][0]] || [])[positions[i][1]] === '*') {
            starsFound.push(`(${positions[i][0]},${positions[i][1]})`);
        }
    }

    return starsFound;
}

const mainTwo = (): any => {
    const starCollection: any = {};
    const matrix = fs.readFileSync('data').toString().split('\n').map((line) => {
        return line.split('');
    });

    for (let i = 0; i < matrix.length; i++) {
        let line = matrix[i];
        let numberBuffer = '';
        let starBuffer: string[] = [];
        for (let j = 0; j < line.length; j++) {
            if (isNumber(line[j])) {
                numberBuffer += line[j];

                if (hasStar(matrix, i, j).length > 0) {
                    starBuffer = starBuffer.concat(hasStar(matrix, i, j));
                }

                if (j !== line.length - 1) {
                    continue;
                }
            }

            if (numberBuffer !== '') {
                const stars = [... new Set(starBuffer)];
                stars.forEach((star) => {
                    if (starCollection[star] === undefined) {
                        starCollection[star] = [numberBuffer];
                    } else {
                        starCollection[star].push(numberBuffer);
                    }
                });
            }

            numberBuffer = '';
            starBuffer = [];
        }
    }

    const value = Object.keys(starCollection).filter((key) => {
        return starCollection[key].length === 2;
    }).map((key) => {
        const firstNum = parseInt(starCollection[key][0]);
        const secondNum = parseInt(starCollection[key][1]);
        return firstNum * secondNum;
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return value;
}

console.log(mainTwo());
