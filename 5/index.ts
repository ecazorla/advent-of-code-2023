import * as fs from 'fs';

const mainOne = (): any => {
    const data = fs.readFileSync('data').toString().split('\n\n');
    const seeds = data[0].split(': ')[1].split(' ').map(seed => parseInt(seed));

    const maps = data.slice(1).map((map) => {
        return map.split('\n').slice(1).map(line => line.split(' ').map(number => parseInt(number)));
    });

    return seeds.map((seed) => {
        let value = seed;
        for (let i = 0; i < maps.length; i++) {
            const set = maps[i];
            for (let j = 0; j < set.length; j++) {
                const map = set[j];
                
                if (value >= map[1] && value < map[1] + map[2]) {
                    value = value + (map[0] - map[1]);
                    break;
                }
            }
        }

        return value;
    }).sort((a, b) => a - b)[0];
}

const mainTwo = (): any => {
    const data = fs.readFileSync('data').toString().split('\n\n');
    const seeds = data[0].split(': ')[1].split(' ').map(seed => parseInt(seed));

    const maps = data.slice(1).map((map) => {
        return map.split('\n').slice(1).map(line => line.split(' ').map(number => parseInt(number)));
    });

    let pairsArray = [];
    for (let i = 0; i < seeds.length; i = i + 2) {
        pairsArray.push([seeds[i], seeds[i+1]])
    }

    return pairsArray.map((pair, pairIndex) => {
        let minimum; 

        for (let index = pair[0]; index < pair[0] + pair[1]; index++) {
            console.log(`(pair ${pairIndex} of ${pairsArray.length}) on index ${index} of ${pair[0] + pair[1]}`);
            
            let value = index;
            for (let i = 0; i < maps.length; i++) {
                const set = maps[i];
                for (let j = 0; j < set.length; j++) {
                    const map = set[j];
                    
                    if (value >= map[1] && value < map[1] + map[2]) {
                        value = value + (map[0] - map[1]);
                        break;
                    }
                }
            }

            if (minimum === undefined || value < minimum) {
                minimum = value;
            }
        }
        
        return minimum;
    }).sort((a, b) => a - b)[0];
}

console.log(mainOne());
console.log(mainTwo());
