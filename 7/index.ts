import * as fs from 'fs';

const groupHandCards = (hand: string): any => {
    const group = {};
    hand.split(' ')[0].split('').forEach((card: string) => {
        group[card] = group[card] ? group[card] + 1 : 1;
    });

    return group;
}

const getGroupStrength = (group: any): number => {
    const keys = Object.keys(group);
    let fives = [];
    let fours = [];
    let pairs = [];
    let trios = [];

    for (let index = 0; index < keys.length; index++) {
        // console.log(group);
        // console.log(index, keys[index], group[keys[index]]);
        
        if (group[keys[index]] === 5) {
            fives.push(keys[index]);
        }

        if (group[keys[index]] === 4) {
            fours.push(keys[index]);
        }

        if (group[keys[index]] === 3) {
            trios.push(keys[index]);
        }

        if (group[keys[index]] === 2) {
            pairs.push(keys[index]);
        }
    }

    if (fives.length > 0) {
        return 6;
    }

    if (fours.length > 0) {
        return 5;
    }
    
    if (trios.length > 0 && pairs.length > 0) {
        return 4;
    }

    if (trios.length > 0) {
        return 3;
    }

    if (pairs.length > 1) {
        return 2;
    }

    if (pairs.length > 0) {
        return 1;
    }

    return 0;
}

const getGroupStrengthWithJoker = (group: any): number => {
    const jokers = group['J'] ? group['J'] : 0;
    const keys = Object.keys(group);
    let fives = [];
    let fours = [];
    let pairs = [];
    let trios = [];

    const pointsMatch = {
        fives: 6,
        fours: 5,
        house: 4,
        trios: 3,
        twopairs: 2,
        pair: 1,
        nothing: 0,
    }

    for (let index = 0; index < keys.length; index++) {
        if (keys[index] === 'J') {
            continue;
        }
        
        if (group[keys[index]] === 5) {
            fives.push(keys[index]);
        }

        if (group[keys[index]] === 4) {
            fours.push(keys[index]);
        }

        if (group[keys[index]] === 3) {
            trios.push(keys[index]);
        }

        if (group[keys[index]] === 2) {
            pairs.push(keys[index]);
        }
    }

    if (jokers === 5 || jokers === 4) {
        return pointsMatch.fives;
    }

    if (jokers === 3) {
        if (pairs.length === 1) {
            return pointsMatch.fives;
        }
        
        return pointsMatch.fours;
    }

    if (jokers === 2) {
        if (trios.length === 1) {
            return pointsMatch.fives;
        }

        if (pairs.length === 1) {
            return pointsMatch.fours
        }

        return pointsMatch.trios;
    }

    if (jokers === 1) {
        if (fours.length === 1) {
            return pointsMatch.fives;
        }

        if (trios.length === 1) {
            return pointsMatch.fours;
        }

        if (pairs.length === 2) {
            return pointsMatch.house;
        }

        if (pairs.length === 1) {
            return pointsMatch.trios;
        }

        return pointsMatch.pair;
    }

    if (fives.length > 0) {
        return 6;
    }

    if (fours.length > 0) {
        return 5;
    }
    
    if (trios.length > 0 && pairs.length > 0) {
        return 4;
    }

    if (trios.length > 0) {
        return 3;
    }

    if (pairs.length > 1) {
        return 2;
    }

    if (pairs.length > 0) {
        return 1;
    }

    return 0;
}

const sortByHand = (a: string, b: string, withJokder: boolean = false): number => {
    const aCards = a.split('');
    const bCards = b.split('');
    const cardOrder = withJokder ? ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'] : ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

    for (let index = 0; index < aCards.length; index++) {
        const aIndex = cardOrder.indexOf(aCards[index]);
        const bIndex = cardOrder.indexOf(bCards[index]);
        if (aIndex > bIndex) {
            return -1;
        }

        if (aIndex < bIndex) {
            return 1;
        }
    }
}

const main = (): any => {
    const hands = fs.readFileSync('data').toString().split('\n');

    return hands.map(hand => {
        const group = groupHandCards(hand);

        return {
            hand: hand.split(' ')[0],
            bid: hand.split(' ')[1],
            strength: getGroupStrength(group),
        }
    }).sort((a, b) => {
        if (a.strength > b.strength) {
            return 1;
        }

        if (a.strength < b.strength) {
            return -1;
        }

        if (a.strength === b.strength) {
            return sortByHand(a.hand, b.hand)
        }

        return 0;
    }).map((hand, index) => {
        return parseInt(hand.bid) * (index + 1);
    }).reduce((a, b) => a + b, 0);
}

const mainTwo = (): any => {
    const hands = fs.readFileSync('data').toString().split('\n');

    return hands.map(hand => {
        const group = groupHandCards(hand);

        return {
            hand: hand.split(' ')[0],
            bid: hand.split(' ')[1],
            strength: getGroupStrengthWithJoker(group),
        }
    }).sort((a, b) => {
        if (a.strength > b.strength) {
            return 1;
        }

        if (a.strength < b.strength) {
            return -1;
        }

        if (a.strength === b.strength) {
            return sortByHand(a.hand, b.hand, true)
        }

        return 0;
    }).map((hand, index) => {
        return parseInt(hand.bid) * (index + 1);
    }).reduce((a, b) => a + b, 0);
}

console.log(main());
console.log(mainTwo());
