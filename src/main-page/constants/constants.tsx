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

export interface SupportCardInfo {
    event_stats: number[];
    race_bonus_gains: number;
    rainbow_gains: number[];
    starting_stats: number[];
};

export interface SupportCardScore {
    char_name: string;
    id: number;
    info: SupportCardInfo;
    lb: number;
    score: number;
};