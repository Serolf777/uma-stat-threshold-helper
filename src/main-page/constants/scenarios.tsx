export interface CombinedWeights {
    bondPerDay: number;
    races: number[];
    unbondedTrainingGain: number[][];
    bondedTrainingGain: number[][];
    summerTrainingGain: number[][];
    umaBonus: number[];
    multi: number;
    bonusSpec: number;
    motivation: number;
    scenarioLink: string[];
    scenarioBonus: number;
    fanBonus: number;
    type: number,
    stats: number[],
    cap: number,
    minimum: number,
    prioritize: boolean,
    onlySummer: boolean,
};

export interface ScenarioStates {
    version: number,
    currentState: string,
    show: boolean,
    general: {
        bondPerDay: number,
        races: number[],
        unbondedTrainingGain: number[][],
        bondedTrainingGain: number[][],
        summerTrainingGain: number[][],
        umaBonus: number[],
        multi: number,
        bonusSpec: number,
        motivation: number,
        scenarioLink: string[],
        scenarioBonus: number,
        fanBonus: number
    },
    speed: {
        type: number,
        stats: number[],
        cap: number,
        minimum: number,
        prioritize: boolean,
        onlySummer: boolean,
    },
    stamina: {
        type: number,
        stats: number[],
        cap: number,
        minimum: number,
        prioritize: boolean,
        onlySummer: boolean,
    },
    power: {
        type: number,
        stats: number[],
        cap: number,
        minimum: number,
        prioritize: boolean,
        onlySummer: boolean,
    },
    guts: {
        type: number,
        stats: number[],
        cap: number,
        minimum: number,
        prioritize: boolean,
        onlySummer: boolean,
    },
    wisdom: {
        type: number,
        stats: number[],
        cap: number,
        minimum: number,
        prioritize: boolean,
        onlySummer: boolean,
    },
    friend: {
        type: number,
        stats: number[],
        cap: number,
        minimum: number,
        prioritize?: boolean,
        onlySummer?: boolean,
    }
};

export interface CardStats {
    type: number,
    stats: number[],
    cap: number,
    minimum: number,
    prioritize: boolean,
    onlySummer: boolean,
}

export const defaultMANTState = {
    version: 18,
    currentState: "speed",
    show: false,
    general: {
        bondPerDay: 10,
        races: [15, 10, 2, 3],
        unbondedTrainingGain: [
            [8, 0, 4, 0, 0, 2, 19],
            [0, 7, 0, 3, 0, 2, 17],
            [0, 4, 6, 0, 0, 2, 18],
            [3, 0, 3, 6, 0, 2, 20],
            [2, 0, 0, 0, 6, 3, 0]
        ],
        bondedTrainingGain: [
            [10, 0, 4, 0, 0, 2, 21],
            [0, 8, 0, 3, 0, 2, 18],
            [0, 4, 7, 0, 0, 2, 19],
            [4, 0, 3, 9, 0, 2, 24],
            [3, 0, 0, 0, 9, 3, 0]
        ],
        summerTrainingGain: [
            [12, 0, 6, 0, 0, 2, 24],
            [0, 11, 0, 5, 0, 2, 22],
            [0, 6, 10, 0, 0, 2, 23],
            [4, 0, 4, 10, 0, 2, 25],
            [4, 0, 0, 0, 10, 3, 0]
        ],
        umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
        multi: 1.4,
        bonusSpec: 0,
        motivation: 0.2,
        scenarioLink: [],
        scenarioBonus: 0,
        fanBonus: 0.15
    },
    speed: {
        type: 0,
        stats: [1, 1, 1.1, 1, 1, 0.5, 1],
        cap: 350,
        minimum: 50,
        prioritize: true,
        onlySummer: false,
    },
    stamina: {
        type: 1,
        stats: [1, 1, 1, 1.1, 1, 0.5, 1],
        cap: 350,
        minimum: 40,
        prioritize: false,
        onlySummer: false,
    },
    power: {
        type: 2,
        stats: [1, 1.1, 1, 1, 1, 0.5, 1],
        cap: 350,
        minimum: 50,
        prioritize: false,
        onlySummer: false,
    },
    guts: {
        type: 3,
        stats: [2, 1, 2, 1, 1, 0.5, 1],
        cap: 350,
        minimum: 50,
        prioritize: true,
        onlySummer: false,
    },
    wisdom: {
        type: 4,
        stats: [1.1, 1, 1, 1, 1, 0.5, 1],
        cap: 350,
        minimum: 40,
        prioritize: true,
        onlySummer: false,
    },
    friend: {
        type: 6,
        stats: [1, 1, 1, 1, 1, 0.5, 0.5],
        cap: 350,
        minimum: 40,
    }
};

export const defaultAoharuState = {
    version: 18,
    currentState: "wisdom",
    show: false,
    general: {
        bondPerDay: 10,
        races: [7, 2, 0, 3],
        unbondedTrainingGain: [
            [8, 0, 4, 0, 0, 4, 19],
            [0, 8, 0, 6, 0, 4, 20],
            [0, 4, 9, 0, 0, 4, 20],
            [3, 0, 3, 6, 0, 4, 20],
            [2, 0, 0, 0, 6, 5, 0]
        ],
        bondedTrainingGain: [
            [12, 0, 5, 0, 0, 4, 24],
            [0, 12, 0, 7, 0, 4, 25],
            [0, 5, 13, 0, 0, 4, 25],
            [4, 0, 3, 10, 0, 4, 25],
            [3, 0, 0, 0, 10, 5, 0]
        ],
        summerTrainingGain: [
            [13, 0, 6, 0, 0, 4, 25],
            [0, 13, 0, 8, 0, 4, 26],
            [0, 6, 14, 0, 0, 4, 26],
            [4, 0, 4, 11, 0, 4, 26],
            [4, 0, 0, 0, 11, 5, 0]
        ],
        umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
        multi: 1,
        bonusSpec: 0,
        motivation: 0.2,
        scenarioLink: [
            "マチカネフクキタル",
            "ハルウララ",
            "樫本理子",
            "ライスシャワー",
            "タイキシャトル"
        ],
        scenarioBonus: 40,
        fanBonus: 0.05
    },
    speed: {
        type: 0,
        stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
        cap: 550,
        minimum: 40,
        prioritize: false,
        onlySummer: false,
    },
    stamina: {
        type: 1,
        stats: [1, 1.5, 1.5, 1.1, 1, 0.5, 1],
        cap: 400,
        minimum: 30,
        prioritize: false,
        onlySummer: false,
    },
    power: {
        type: 2,
        stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
        cap: 400,
        minimum: 30,
        prioritize: false,
        onlySummer: false,
    },
    guts: {
        type: 3,
        stats: [2, 1.5, 2, 1, 1, 0.5, 1],
        cap: 500,
        minimum: 40,
        prioritize: false,
        onlySummer: false,
    },
    wisdom: {
        type: 4,
        stats: [1.2, 1, 1, 1, 1.5, 1, 0.5],
        cap: 900,
        minimum: 30,
        prioritize: true,
        onlySummer: false,
    },
    friend: {
        type: 6,
        stats: [1, 1.5, 1.5, 1, 1, 0.5, 0.5],
        cap: 500,
        minimum: 40,
    }
};

export const defaultUnityState = 
{
    type: 0,
    bondPerDay: 3.5,
    trainingDays: 50,
    races: [10, 10, 5, 3],
    unbondedTrainingGain: [
        [8, 0, 4, 0, 0, 2, 19],
        [0, 7, 0, 3, 0, 2, 17],
        [0, 4, 6, 0, 0, 2, 18],
        [3, 0, 3, 6, 0, 2, 20],
        [2, 0, 0, 0, 6, 3, 0]
    ],
    bondedTrainingGain: [
        [10, 0, 4, 0, 0, 2, 21],
        [0, 8, 0, 3, 0, 2, 18],
        [0, 4, 7, 0, 0, 2, 19],
        [4, 0, 3, 9, 0, 2, 24],
        [3, 0, 0, 0, 9, 3, 0]
    ],
    summerTrainingGain: [
        [11, 0, 5, 0, 0, 2, 22],
        [0, 9, 0, 6, 0, 2, 21],
        [0, 4, 10, 0, 0, 2, 21],
        [3, 0, 2, 10, 0, 2, 24],
        [3, 0, 0, 0, 9, 3, 0]
    ],
    umaBonus: [1, 1, 1, 1, 1, 1],
    stats: [1, 1, 1.1, 1, 1, 0.5, 1.5],
    multi: 1,
    bonusFS: 0,
    bonusSpec: 0,
    motivation: 0.2,
    scenarioLink: [],
    scenarioBonus: 0,
    fanBonus: 0.05,
    prioritize: true,
    onlySummer: false,
    minimum: 0
};

export const defaultURAState = {
    version: 18,
    currentState: "speed",
    show: false,
    general: {
        bondPerDay: 10,
        races: [7, 2, 0, 3],
        unbondedTrainingGain: [
            [11, 0, 6, 0, 0, 4, 21],
            [0, 10, 0, 6, 0, 4, 19],
            [0, 6, 9, 0, 0, 4, 20],
            [5, 0, 5, 8, 0, 4, 22],
            [2, 0, 0, 0, 10, 5, 0]
        ],
        bondedTrainingGain: [
            [13, 0, 6, 0, 0, 4, 23],
            [0, 11, 0, 6, 0, 4, 21],
            [0, 6, 11, 0, 0, 4, 22],
            [5, 0, 5, 10, 0, 4, 24],
            [2, 0, 0, 0, 12, 5, 0]
        ],
        summerTrainingGain: [
            [15, 0, 8, 0, 0, 4, 24],
            [0, 14, 0, 7, 0, 4, 25],
            [0, 8, 13, 0, 0, 4, 25],
            [6, 0, 6, 12, 0, 4, 25],
            [4, 0, 0, 0, 14, 5, 0]
        ],
        umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
        multi: 1,
        bonusSpec: 0,
        motivation: 0.2,
        scenarioLink: ["Aoi Kiryuin"],
        scenarioBonus: 16,
        fanBonus: 0.05
    },
    speed: {
        type: 0,
        stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
        cap: 500,
        minimum: 40,
        prioritize: true,
        onlySummer: false,
    },
    stamina: {
        type: 1,
        stats: [1, 1.5, 1.5, 1.1, 1, 0.5, 1],
        cap: 400,
        minimum: 30,
        prioritize: false,
        onlySummer: false,
    },
    power: {
        type: 2,
        stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
        cap: 400,
        minimum: 30,
        prioritize: false,
        onlySummer: false,
    },
    guts: {
        type: 3,
        stats: [2, 1.5, 2, 1, 1, 0.5, 1],
        cap: 500,
        minimum: 40,
        prioritize: true,
        onlySummer: false,
    },
    wisdom: {
        type: 4,
        stats: [1.1, 1.5, 1.5, 1, 1, 0.5, 1],
        cap: 500,
        minimum: 30,
        prioritize: true,
        onlySummer: false,
    },
    friend: {
        type: 6,
        stats: [1, 1.5, 1.5, 1, 1, 0.5, 0.5],
        cap: 500,
        minimum: 40,
    }
};