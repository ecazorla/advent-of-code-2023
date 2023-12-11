import * as fs from 'fs';

// No need this function! Just keeping it for the record...
const expand = (universe: string[][]): string[][] => {
    for (let i = 0; i < universe[0].length; i++) {
        const rows = universe.length;

        let allEmpty = true;
        for (let j = 0; j < rows; j++) {
            if (universe[j][i] !== '.') {
                allEmpty = false;
                break;
            }
        }

        if (allEmpty) {
            for (let j = 0; j < rows; j++) {
                universe[j].splice(i + 1, 0, '.');
            }
            i++;
        }
    }

    for (let i = 0; i < universe.length; i++) {
        const line = universe[i];
        if (line.every((char) => char === '.')) {
            universe.splice(i + 1, 0, line);
            i++;
        }
    }

    return universe;
}

const countGalaxies = (universe: string[][]): number[][] => {
    const galaxies = [];
    for (let i = 0; i < universe.length; i++) {
        const line = universe[i];
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === '#') {
                galaxies.push([i, j]);
            }
        }
    }

    return galaxies;
}

const getPairsOfGalaxies = (galaxies: number[][]): number[][][] => {
    const pairs = []
    for (var i = 0; i < galaxies.length; i++) {
        for (var j = i + 1; j < galaxies.length; j++) {
            pairs.push([galaxies[i], galaxies[j]]);
        }
    }

    return pairs;
}

const getEmptyRowsFromPairs = (pair: number[][], universe: string[][]): number => {
    const rowFrom = Math.min(pair[0][0], pair[1][0]);
    const rowTo = Math.max(pair[0][0], pair[1][0]);

    let count = 0
    for (let i = rowFrom + 1; i < rowTo; i++) {
        if (universe[i].every(char => char === '.')) {
            count++;
        }
    }

    return count;
}

const getEmptyColoumsFromPairs = (pair: number[][], universe: string[][]): number => {
    const columnFrom = Math.min(pair[0][1], pair[1][1]);
    const columnTo = Math.max(pair[0][1], pair[1][1]);

    let count = 0;
    for (let i = columnFrom + 1; i < columnTo; i++) {
        let empty = true;
        for (let j = 0; j < universe.length; j++) {
            if (universe[j][i] !== '.') {
                empty = false;
                break;
            }
        }

        if (empty) {
            count++;
        }
    }
    return count;
}

const main = (): any => {
    const universeExpansionFactor = 2;
    let universe = fs.readFileSync('data').toString().split('\n').map(line => line.split(''));
    const galaxies = countGalaxies(universe);
    const pairs = getPairsOfGalaxies(galaxies);
    return pairs.map(pair => {
        const emptyColums = getEmptyColoumsFromPairs(pair, universe);
        const emptyRows = getEmptyRowsFromPairs(pair, universe);
        const distance = Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1]) + ((universeExpansionFactor - 1) * (emptyRows + emptyColums));
        return distance;
    }).reduce((a, b) => a + b, 0);
}

const mainTwo = (): any => {
    const universeExpansionFactor = 1000000;
    let universe = fs.readFileSync('data').toString().split('\n').map(line => line.split(''));
    const galaxies = countGalaxies(universe);
    const pairs = getPairsOfGalaxies(galaxies);

    return pairs.map(pair => {
        const emptyColums = getEmptyColoumsFromPairs(pair, universe);
        const emptyRows = getEmptyRowsFromPairs(pair, universe);
        const distance = Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1]) + ((universeExpansionFactor - 1) * (emptyRows + emptyColums));
        return distance;
    }).reduce((a, b) => a + b, 0);
}

console.log(main());
console.log(mainTwo());
