import { RarityFilter, SupportCardWithScore } from "../cards/cards-interfaces";

export const defaultLbFilter: RarityFilter[] = 
[
    { 
        rarity: 1,
        lb: [ 4 ]
    }, 
    {
        rarity: 2,
        lb: [ 4 ]
    }, 
    {
        rarity: 3,
        lb: [ 4 ]
    }
];

export const defaultCardsSelected: SupportCardWithScore[] = 
[
    {
        "id": 30028,
        "type": 0,
        "group": false,
        "rarity": 3,
        "limit_break": 4,
        "starting_stats": [
            0,
            0,
            0,
            0,
            0
        ],
        "type_stats": 0,
        "stat_bonus": [
            0,
            0,
            1,
            0,
            0,
            0
        ],
        "race_bonus": 5,
        "sb": 35,
        "specialty_rate": 80,
        "unique_specialty": 1.2,
        "offstat_appearance_denominator": 4,
        "tb": 1.1500000000000001,
        "fs_bonus": 1.25,
        "mb": 1.3,
        "unique_fs_bonus": 1,
        "fs_stats": [
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "fs_training": 0,
        "fs_motivation": 0,
        "fs_specialty": 1,
        "fs_ramp": [
            0,
            0
        ],
        "fs_energy": 0,
        "wisdom_recovery": 0,
        "effect_size_up": 1,
        "energy_up": 1,
        "energy_discount": 0,
        "fail_rate_down": 0,
        "hint_rate": 1.3,
        "highlander_threshold": 4,
        "highlander_training": 0,
        "crowd_bonus": 0,
        "char_name": "Kitasan Black",
        "fan_bonus": 0,
        "score": 0
    },
    {
        "id": 20023,
        "type": 0,
        "group": false,
        "rarity": 2,
        "limit_break": 4,
        "starting_stats": [
            0,
            0,
            0,
            0,
            0
        ],
        "type_stats": 0,
        "stat_bonus": [
            0,
            0,
            0,
            0,
            0,
            1
        ],
        "race_bonus": 5,
        "sb": 25,
        "specialty_rate": 50,
        "unique_specialty": 1,
        "offstat_appearance_denominator": 4,
        "tb": 1.1,
        "fs_bonus": 1.3,
        "mb": 1.4,
        "unique_fs_bonus": 1,
        "fs_stats": [
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "fs_training": 0,
        "fs_motivation": 0,
        "fs_specialty": 1,
        "fs_ramp": [
            0,
            0
        ],
        "fs_energy": 0,
        "wisdom_recovery": 0,
        "effect_size_up": 1,
        "energy_up": 1,
        "energy_discount": 0,
        "fail_rate_down": 0,
        "hint_rate": 1.2,
        "highlander_threshold": 4,
        "highlander_training": 0,
        "crowd_bonus": 0,
        "char_name": "Sweep Tosho",
        "fan_bonus": 0,
        "score": 0
    },
    {
        "id": 20020,
        "type": 0,
        "group": false,
        "rarity": 2,
        "limit_break": 4,
        "starting_stats": [
            20,
            0,
            0,
            0,
            0
        ],
        "type_stats": 0,
        "stat_bonus": [
            1,
            0,
            1,
            0,
            0,
            0
        ],
        "race_bonus": 0,
        "sb": 25,
        "specialty_rate": 60,
        "unique_specialty": 1,
        "offstat_appearance_denominator": 4,
        "tb": 1.05,
        "fs_bonus": 1.2,
        "mb": 1.3,
        "unique_fs_bonus": 1,
        "fs_stats": [
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "fs_training": 0,
        "fs_motivation": 0,
        "fs_specialty": 1,
        "fs_ramp": [
            0,
            0
        ],
        "fs_energy": 0,
        "wisdom_recovery": 0,
        "effect_size_up": 1,
        "energy_up": 1,
        "energy_discount": 0,
        "fail_rate_down": 0,
        "hint_rate": 1.5,
        "highlander_threshold": 4,
        "highlander_training": 0,
        "crowd_bonus": 0,
        "char_name": "King Halo",
        "fan_bonus": 0,
        "score": 0
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