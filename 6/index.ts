import * as fs from 'fs';

const isNumber = (text: string): boolean => {
    return Number.isInteger(parseInt(text));
}

const mainOne = (): any => {
    const data = fs.readFileSync('data').toString().split('\n').map((line) => {
        return line.split(':')[1].split(' ').filter(char => isNumber(char));
    });

    return data[0].map((time, index) => {
        return [time, data[1][index]].map((value) => {
            return parseInt(value);
        });
    }).map((pair) => {
        let count = 0;
        for (let index = 1; index <= pair[0]; index++) {
            count = (pair[0] - index) * index > pair[1] ? count + 1 : count;
        }

        return count;
    }).reduce((a, b) => a * b, 1);
}

const mainTwo = (): any => {
    const pair = fs.readFileSync('data').toString().split('\n').map((line) => {
        return line.split(':')[1].split(' ').filter(char => isNumber(char));
    }).map((line) => {
        return parseInt(line.join(''));
    });

    let first;
    let last;
    for (let index = 1; index <= pair[0]; index++) {
        if ((pair[0] - index) * index > pair[1]) {
            first = index;
            break;
        }
    }

    for (let index = pair[0]; 1 <= index; index--) {
        if ((pair[0] - index) * index > pair[1]) {
            last = index;
            break;
        }
    }

    return last - first + 1;
}

console.log(mainOne());
console.log(mainTwo());
