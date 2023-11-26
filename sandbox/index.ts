import fs from 'fs';

const main = (): string => {
    const data = fs.readFileSync('data').toString();
    return data;
}

console.log(main());
