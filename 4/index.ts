import * as fs from 'fs';

const parseNumbers = (line: string): any[] => {
    const winning = line.split('|')[0].split(':')[1].trim().split(' ');
    const numbers = line.split('|')[1].split(' ').filter(number => number !== '');
    return [winning, numbers, 1];
};

const mainOne = (): any => {
    const data = fs.readFileSync('data').toString().split('\n').map((line) => {
        return parseNumbers(line);
    }).map((line) => {
        let winners = 0;
        for (let i = 0; i < line[1].length; i++) {
            if (line[0].includes(line[1][i])) {
                winners++;
            }
        }

        return winners;
    }).filter(winner => winner !== 0).map((winner) => {
        return 2 ** (winner - 1);
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return data;
}

const mainTwo = (): any => {
    const lines = fs.readFileSync('data').toString().split('\n').map((line) => {
        return parseNumbers(line);
    }).map((line) => {
        let winners = 0;
        for (let i = 0; i < line[1].length; i++) {
            if (line[0].includes(line[1][i])) {
                winners++;
            }
        }

        return [winners, line[2]];
    });

    for (let i = 0; i < lines.length; i++) {
        const winners = lines[i][0];
        for (let j = 1; j <= winners; j++) {
            lines[i + j][1] = lines[i][1] + lines[i + j][1];
        }
    }
    
    return lines.map((line) => {
        return line[1];
    }).reduce((acc, curr) => {
        return acc + curr;
    });
}

console.log(mainOne());
console.log(mainTwo());
