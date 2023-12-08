import * as fs from 'fs';
import * as lcm from 'compute-lcm';

const main = (): any => {
    const data = fs.readFileSync('data').toString().split('\n');
    const directions = data[0].split('');

    const nodesObj = {};
    data.slice(2).forEach((line) => {
        const node = line.split(' = ')[0];
        const edges = line.split(' = ')[1].slice(1, -1).split(', ');
        nodesObj[node] = edges;
    });
    
    let actualNode = 'AAA';
    let actualIndex = 0;
    let cycles = 0;

    do {
        const direction = directions[actualIndex];
        if (direction === 'L') {
            actualNode = nodesObj[actualNode][0];
        } else {
            actualNode = nodesObj[actualNode][1];
        }

        actualIndex = (actualIndex + 1) % directions.length;

        if (actualIndex === 0) {
            cycles++;
        }
    } while (actualNode !== 'ZZZ');

    return (directions.length * cycles) + actualIndex;
}

const mainTwo = (): any => {
    const data = fs.readFileSync('data').toString().split('\n');
    const directions = data[0].split('');

    const nodesObj = {};
    data.slice(2).forEach((line) => {
        const node = line.split(' = ')[0];
        const edges = line.split(' = ')[1].slice(1, -1).split(', ');
        nodesObj[node] = edges;
    });

    let startingNodes = Object.keys(nodesObj).filter((node) => node[2] === 'A');
    let allEndWithZ = false;
    let actualIndex = 0;
    let finishIndex: any = JSON.parse(JSON.stringify(startingNodes));
    let cycles = 0;
    do {
        const direction = directions[actualIndex];
        startingNodes.forEach((node, index) => {
            if (direction === 'L') {
                startingNodes[index] = nodesObj[node][0];
            } else {
                startingNodes[index] = nodesObj[node][1];
            }
        });

        actualIndex = (actualIndex + 1) % directions.length;

        if (actualIndex === 0) {
            cycles++;
        }

        startingNodes.forEach((node, index) => {
            if (node[2] === 'Z') {
                finishIndex[index] = (directions.length * cycles) + actualIndex;
            }
        });

        if (finishIndex.every(value => {
            return Number.isInteger(value);
        })) {
            allEndWithZ = true;
        }
    } while (!allEndWithZ)

    return lcm(finishIndex);
}

console.log(main());
console.log(mainTwo());
