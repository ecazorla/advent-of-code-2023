import fs from 'fs';

// part 1
const one = (): number => {
    const data = fs.readFileSync('data').toString().split('\n').map((line) => {
        const valueArray = Array.from(line).filter((char) => {
            return Number.isInteger(parseInt(char));
        })

        return parseInt(`${valueArray[0]}${valueArray[valueArray.length - 1]}`);
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return data;
}

console.log(one());

// part 2
const numbersToWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getValuePro = (text: string): any => {
    let firstNumber;
    let secondNumber;
    const textArray = Object.keys(numbersToWords);
    const numbersArray = Object.values(numbersToWords);

    for (let index = 0; index < text.length; index++) {
        if (!firstNumber) {
            if (Number.isInteger(parseInt(text[index]))) {
                firstNumber = parseInt(text[index]);
            } else {
                const slicedText = text.slice(index);
                for (let j = 0; j < textArray.length; j++) {
                    if (slicedText.startsWith(textArray[j])) {
                        firstNumber = numbersArray[j];
                    }
                }
            }
        }

        if (!secondNumber) {
            const indexBack = text.length - 1 - index;
            if (Number.isInteger(parseInt(text[indexBack]))) {
                secondNumber = parseInt(text[indexBack]);
            } else {
                const slicedText = text.slice(indexBack);
                for (let j = 0; j < textArray.length; j++) {
                    if (slicedText.startsWith(textArray[j])) {
                        secondNumber = numbersArray[j];
                    }
                }
            }
        }
        
        if (firstNumber && secondNumber) {
            break;
        }
    }

    return parseInt(`${firstNumber}${secondNumber}`);
}

const two = (): number => {
    const data = fs.readFileSync('data').toString().split('\n').map((line) => {
        return getValuePro(line);
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return data;
}

console.log(two());

