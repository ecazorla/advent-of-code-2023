import * as fs from 'fs';

const getSequence = (data: number[][]): number[][][] => {
    return data.map((line) => {
        let sequenceArray = [line];
        let differenceArray = [];
        let allZeroes = false;
        do {
            for (let index = 1; index < line.length; index++) {
                const difference = line[index] - line[index - 1];
                differenceArray.push(difference);
                
            }

            if (differenceArray.every((difference) => difference === 0)) {
                allZeroes = true;
            }

            sequenceArray.push(differenceArray);
            line = differenceArray;
            differenceArray = [];
        } while (!allZeroes);

        return sequenceArray;
    })
}

const main = (): any => {
    const data = fs.readFileSync('data').toString().split('\n').map((line) => line.split(' ').map((number) => parseInt(number)));
    return getSequence(data).map((sequence) => {
        return sequence.reduce((accumulator, currentValue) => {
            const lastElement = currentValue[currentValue.length - 1];
            return accumulator + lastElement;
        }, 0);
    }).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
}

const mainTwo = (): any => {
    const data = fs.readFileSync('data').toString().split('\n').map((line) => line.split(' ').map((number) => parseInt(number)));
    return getSequence(data).map((sequence) => {
        return sequence.reduce((accumulator, currentValue, index) => {
            const firstElement = currentValue[0];
            return accumulator + (firstElement * (-1) ** index);
        }, 0);
    }).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
}

console.log(main());
console.log(mainTwo());
