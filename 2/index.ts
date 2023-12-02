import fs from 'fs';

const config = {
    'red': 12,
    'green': 13,
    'blue': 14,
}

const parseLine = (line: string) => {
    const splitLine = line.split(':');
    const gameId = splitLine[0].split('Game ')[1];
    const gamesStrings = splitLine[1].split(';');
    const games = gamesStrings.map((gameString) => {
        const game = gameString.split(',').map((colorString) => {
            const value = colorString.trim().split(' ')[0];
            const color = colorString.trim().split(' ')[1];
            return {
                value: parseInt(value),
                color: color,
            };
        });

        return game;
    });

    return {
        id: parseInt(gameId),
        games: games,
    }
}

const isLineValid = (line: string): number => {
    const lineParsed = parseLine(line);

    for (let i = 0; i < lineParsed.games.length; i++) {
        const game = lineParsed.games[i];
        for (let j = 0; j < game.length; j++) {
            const set = game[j];
            if (set.value > config[set.color as keyof typeof config]) {
                return 0;
            }
        }
    }

    return lineParsed.id;
}

const mainOne = (): number => {
    return fs.readFileSync('data').toString().split('\n').map((line) => {
        return isLineValid(line);
    }).reduce((acc, curr) => {
        return acc + curr;
    });
}

console.log(mainOne());

// part 2
const getMinimumSet = (line: string): any => {
    const lineParsed = parseLine(line);
    const minimumSet = {
        red: 0,
        green: 0,
        blue: 0,
    }

    lineParsed.games.forEach((game) => {
        game.forEach((set) => {
            const color = set.color as keyof typeof minimumSet;
            if (set.value > minimumSet[color]) {
                minimumSet[color] = set.value;
            }
        });
    });

    return minimumSet;
};

const mainTwo = (): number => {
    return fs.readFileSync('data').toString().split('\n').map((line) => {
        return getMinimumSet(line);
    }).map(set => {
        return set.red * set.green * set.blue;
    }).reduce((acc, curr) => {
        return acc + curr;
    });
}

console.log(mainTwo());
