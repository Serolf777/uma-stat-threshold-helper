import { RarityFilter } from "../cards/cards-interfaces";

export const defaultLbFilter: RarityFilter[] = 
[
    { 
        rarity: 1,
        lb: [
            0, 1, 2, 3, 4
        ]
    }, 
    {
        rarity: 2,
        lb: [
            0, 1, 2, 3, 4
        ]
    }, 
    {
        rarity: 3,
        lb: [
            0, 1, 2, 3, 4
        ]
    }
];

export interface StatWeights {
    type: number,
    stats: number[],
    cap: number,
    minimum: number,
    prioritize: boolean,
    onlySummer: boolean,
}

export interface WeightsInterface {
    type: number;
    bondPerDay: number;
    trainingDays: number;
    races: number[];
    unbondedTrainingGain: number[][];
    bondedTrainingGain: number[][];
    summerTrainingGain: number[][];
    umaBonus: number[];
    stats: number[];
    multi: number;
    bonusFS: number;
    bonusSpec: number;
    motivation: number;
    scenarioLink: string[];
    scenarioBonus: number;
    fanBonus: number,
    prioritize: boolean;
    onlySummer: boolean;
    minimum: number;
}

export const weights: WeightsInterface = 
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

export interface SupportCardInfo {
    event_stats: number[];
    race_bonus_gains: number;
    rainbow_gains: number[];
    starting_stats: number[];
}

export interface SupportCardScore {
    char_name: string;
    id: number;
    info: SupportCardInfo;
    lb: number;
    score: number;
}