import { SupportCard } from "../cards/cards-interfaces";
import cardEvents from '../constants/cardEvents.tsx'
import { CombinedWeights } from "../constants/scenarios.tsx";

const events: Record<number, number[]> = cardEvents as unknown as Record<number, number[]>;

export interface ProcessedCard {
    id: number;
    type: number;
    group: boolean;
    rarity: number;
    limit_break: number;
    starting_stats: number[];
    type_stats: number;
    stat_bonus: number[];
    race_bonus: number;
    sb: number;
    specialty_rate: number;
    unique_specialty: number;
    offstat_appearance_denominator: number;
    tb: number;
    fs_bonus: number;
    mb: number;
    unique_fs_bonus: number;
    fs_stats: number[];
    fs_training: number;
    fs_motivation: number;
    fs_specialty: number;
    fs_ramp: number[];
    fs_energy: number;
    wisdom_recovery: number;
    effect_size_up: number;
    energy_up: number;
    energy_discount: number;
    fail_rate_down: number;
    hint_rate: number;
    highlander_threshold: number;
    highlander_training: number;
    crowd_bonus: number;
    char_name: string;
    fan_bonus: number;
    rainbowSpecialty: number;
    offSpecialty: number;
    cardType: number;
    index: number;
};

export interface Info {
    id: number;
    type: number;
    starting_stats: number[];
    type_stats: number;
    rainbowSpecialty: number;
    offSpecialty: number;
    event_stats: number[];
    non_rainbow_gains: number[];
    rainbow_gains: number[];
    race_bonus_gains: number;
};

//Currently not used
//const tierNames = ['S', 'A', 'B', 'C', 'D', 'E', 'F']
const raceRewards = [
    [2, 2, 2, 2, 2, 35],
    [1.6, 1.6, 1.6, 1.6, 1.6, 25],
    [1, 1, 1, 1, 1, 20],
    [13.5,13.5,13.5,13.5,13.5,50]
]

export default function processCards(cards: SupportCard[], weights: CombinedWeights, selectedCards: SupportCard[]) {
    let processedCards: ProcessedCard[] = [];
    let finalCards = [];

    // Calculate some stuff here so we don't have to do it a million times later
    let presentTypes = [false,false,false,false,false,false,false];
    let cardsPerType: ProcessedCard[][] = [[],[],[],[],[],[],[]];
    let baseBondNeeded = 0;
    for (let card = 0; card < selectedCards.length; card++) {
        let selectedCard: ProcessedCard = { ...selectedCards[card],
            rainbowSpecialty: 0,
            offSpecialty: 0,
            cardType: 0,
            index: 0
         };
        let cardSpecialty = (100 + selectedCard.specialty_rate + weights.bonusSpec) * selectedCard.unique_specialty * selectedCard.fs_specialty;
        let cardSpecialtyPercent = (cardSpecialty) / (450 + cardSpecialty)
        selectedCard.rainbowSpecialty = cardSpecialtyPercent;
        selectedCard.offSpecialty = 100 / (450 + cardSpecialty);
        selectedCard.cardType = selectedCard.type;
        selectedCard.index = card;
        presentTypes[selectedCard.cardType] = true;
        cardsPerType[selectedCard.cardType].push(selectedCard);
        if (selectedCard.cardType == 6) {
            baseBondNeeded += 55 - selectedCard.sb
        } else {
            baseBondNeeded += 75 - selectedCard.sb
        }
        if (events[selectedCard.id]) {
            baseBondNeeded -= events[selectedCard.id][7];
        }
        processedCards.push(selectedCard);
    }

    let preferredRainbowChances = [0,0,0,0,0];
    for (let i = 0; i < 5; i++) {
        if (i != weights.type) {
            if(cardsPerType[i].length > 0) {
                let minimum = 1;
                if (weights.prioritize) {
                    minimum = 2;
                }
                let combos = GetCombinations(cardsPerType[i], minimum);
                if (combos.length > 0) {
                    preferredRainbowChances[i] = combos.reduce((current, combo) => {
                        return current += CalculateCombinationChance(combo, undefined, i);
                    }, 0);
                }
            }
        }
    }
    
    let chanceOfPreferredRainbow = 1 - preferredRainbowChances.reduce((current, chance) => {
        return current * (1 - chance);
    }, 1);
    
    for (let i = 0; i < cards.length; i++) {
        let info: Info = {} as Info;
        let card: ProcessedCard = { ...cards[i],
            rainbowSpecialty: 0,
            offSpecialty: 0,
            cardType: 0,
            index: 0,
         };
        let cardType = card.type;
        card.index = 6;
        let bondNeeded = baseBondNeeded;
        if (cardType == 6) {
            bondNeeded += 55 - card.sb
        } else {
            bondNeeded += 75 - card.sb
        }
        let presentTypesWithCard = presentTypes.slice();
        presentTypesWithCard[cardType] = true;

        let typeCount = presentTypesWithCard.filter(Boolean).length;

        // Add starting stats and stats from events
        let score = card.sb;
        let energyGain = 0;
        let statGains = card.starting_stats.slice();
        statGains.push(0);
        
        info.starting_stats = card.starting_stats.slice();
        info.event_stats = [0,0,0,0,0,0,0];
        
        if (events[card.id]) {
            info.event_stats = events[card.id].slice();
            for (let stat = 0; stat < 6; stat++) {
                statGains[stat] += events[card.id][stat] * card.effect_size_up;
                info.event_stats[stat] = events[card.id][stat] * card.effect_size_up;
            }
            energyGain += events[card.id][6] * card.energy_up;
            bondNeeded -= events[card.id][7];
            score += events[card.id][7];
        } else {
            // Dummy event values for cards we don't yet know the events for
            if (card.rarity === 2) {
                // 35 total
                for (let stat = 0; stat < 5; stat++) {
                    statGains[stat] += 7;
                }
                bondNeeded -= 5;
            } else if (card.rarity === 3) {
                // 45 total
                for (let stat = 0; stat < 5; stat++) {
                    statGains[stat] += 9;
                }
                bondNeeded -= 5;
            }
            score += 5;
        }

        if (card.type_stats > 0) {
            statGains[card.type] += card.type_stats;
            for (let sc = 0; sc < selectedCards.length; sc++) {
                if(selectedCards[sc].type < 6) {
                    statGains[selectedCards[sc].type] += card.type_stats;
                } else {
                    statGains[0] += card.type_stats / 5;
                    statGains[1] += card.type_stats / 5;
                    statGains[2] += card.type_stats / 5;
                    statGains[3] += card.type_stats / 5;
                    statGains[4] += card.type_stats / 5;
                }
            }
        }
        
        let trainingDays = 65 - weights.races[0] - weights.races[1] - weights.races[2];
        if(cardType === 6) trainingDays -= 5;
        let daysToBond = bondNeeded / weights.bondPerDay;
        let rainbowDays = trainingDays - daysToBond;
        let specialty = (100 + card.specialty_rate + weights.bonusSpec) * card.unique_specialty * card.fs_specialty;
        let specialtyPercent = specialty / (450 + specialty);
        let otherPercent = 100 / (450 + specialty);
        let offstatAppearanceDenominator = card.offstat_appearance_denominator;
        let daysPerTraining = [0,0,0,0,0];
        let bondedDaysPerTraining = [0,0,0,0,0];
        let rainbowTraining = 0;
        
        let rainbowOverride = 1;
        if (cardType != 6) {
            let chanceOfSingleRainbow = 0;
            let cardsOfThisType = cardsPerType[cardType].slice();
            card.rainbowSpecialty = specialtyPercent;
            card.offSpecialty = otherPercent;
            cardsOfThisType.push(card);
            for (let j = 0; j < cardsOfThisType.length; j++) {
                chanceOfSingleRainbow += CalculateCombinationChance([cardsOfThisType[j]], cardsOfThisType, cardType);
            }
            rainbowOverride = 1 - (chanceOfPreferredRainbow * chanceOfSingleRainbow);
        }
        
        // Calculate appearance rates on each training
        for (let stat = 0; stat < 5; stat++) {
            if (stat == cardType) {
                rainbowTraining = specialtyPercent * rainbowDays * rainbowOverride;
                daysPerTraining[stat] = specialtyPercent * daysToBond;
            } else {
                daysPerTraining[stat] = otherPercent / offstatAppearanceDenominator * daysToBond;
                bondedDaysPerTraining[stat] = otherPercent / offstatAppearanceDenominator * rainbowDays;
            }
        }

        if (weights.onlySummer) {
            rainbowTraining = 8 * specialtyPercent * rainbowOverride;
        }

        if (card.fs_ramp[0] > 0) {
            let current_bonus = 0;
            let total = 0;
            for (let j = rainbowTraining * 0.66; j > 0; j--) {
                total += current_bonus;
                current_bonus = Math.min(current_bonus + card.fs_ramp[0], card.fs_ramp[1]);
            }
            card.unique_fs_bonus = 1 + total / rainbowTraining / 100;
        }

        // Stats from cross-training
        info.non_rainbow_gains = [0,0,0,0,0,0,0];
        for (let training = 0; training < 5; training ++) {
            let gains = weights.unbondedTrainingGain[training];
            let daysOnThisTraining = daysPerTraining[training];
            energyGain += daysOnThisTraining * gains[6] * card.energy_discount;

            let trainingGains = CalculateCrossTrainingGain(gains, weights, card, processedCards, training, daysOnThisTraining, typeCount, false);
            
            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
                info.non_rainbow_gains[stat] += trainingGains[stat];
            }
            info.non_rainbow_gains[6] += (daysOnThisTraining * gains[6] * card.energy_discount);
        }

        // Stats from cross-training while bonded
        for (let training = 0; training < 5; training ++) {
            let gains = weights.bondedTrainingGain[training];
            let daysOnThisTraining = bondedDaysPerTraining[training];
            energyGain += daysOnThisTraining * gains[6] * card.energy_discount;
            energyGain += daysOnThisTraining * gains[6] * card.fs_energy;

            let trainingGains = CalculateCrossTrainingGain(gains, weights, card, processedCards, training, daysOnThisTraining, typeCount, true);
            
            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
                info.non_rainbow_gains[stat] += trainingGains[stat];
            }

            info.non_rainbow_gains[6] += (daysOnThisTraining * gains[6] * card.energy_discount);
            info.non_rainbow_gains[6] += (daysOnThisTraining * gains[6] * card.fs_energy);

            if (training == 4 && card.group) {
                energyGain += daysOnThisTraining * card.wisdom_recovery / 5;
            }
        }

        info.rainbow_gains = [0,0,0,0,0,0,0];

        // Stats from rainbows
        if (cardType < 6) {
            energyGain += rainbowTraining * card.wisdom_recovery;
            let specialtyGains = weights.bondedTrainingGain[cardType];
            if (weights.onlySummer) {
                specialtyGains = weights.summerTrainingGain[cardType];
            }
            let trainingGains = CalculateTrainingGain(specialtyGains, weights, card, processedCards, cardType, rainbowTraining, true, typeCount);

            info.rainbow_gains = trainingGains.slice();
            info.rainbow_gains.push(rainbowTraining * card.wisdom_recovery);

            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
            }
        }

        info.race_bonus_gains = 0;

        // Race bonus
        for (let raceType = 0; raceType < 4; raceType++) {
            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += raceRewards[raceType][stat] * (card.race_bonus / 100) * weights.races[raceType];
                info.race_bonus_gains += raceRewards[raceType][stat] * (card.race_bonus / 100) * weights.races[raceType];
            }
        }

        // Convert stat gains to score
        score += GainsToScore(statGains, weights);
        score += energyGain * weights.stats[6];

        if(weights.scenarioLink.indexOf(card.char_name) > -1) {
            score += weights.scenarioBonus;
        }

        finalCards.push({
            id: card.id,
            lb: card.limit_break,
            score: score,
            info: info,
            char_name: card.char_name
        })
    }

    finalCards.sort((a, b) => b.score - a.score);

    return finalCards;
};


function GetCombinations(cards: ProcessedCard[], minLength = 1) {
    let combinations = [];
    let temp = [];
    const count = Math.pow(2, cards.length);

    for (let i = 0; i < count; i++){
        temp = [];
        for (let j = 0; j<cards.length; j++) {
            if (i & Math.pow(2,j)) { 
                temp.push(cards[j]);
            }
        }
        if (temp.length >= minLength) {
            combinations.push(temp);
        }
    }

    return combinations;
};

function GainsToScore(gains: number[], weights: CombinedWeights) {
    let score = 0;
    for (let stat = 0; stat < 6; stat ++) {
        score += Math.min(gains[stat], weights.cap) * weights.stats[stat];
    }
    return score;
};

function CalculateCrossTrainingGain(
    gains: number[], 
    weights: CombinedWeights, 
    card: SupportCard, 
    otherCards: ProcessedCard[], 
    trainingType: number, 
    days: number, 
    typeCount: number, 
    bonded: boolean
) {
    let trainingGains = [0,0,0,0,0,0,0];
    let statCards = otherCards.filter((c) => c.cardType === trainingType);
    let trainingBonus = card.tb + card.fan_bonus * weights.fanBonus;
    if (typeCount >= card.highlander_threshold) trainingBonus += card.highlander_training;
    let fsBonus = 1;
    if (card.group && bonded) {
        fsBonus += (card.fs_bonus + card.unique_fs_bonus - 1) / 5;
    }
    const combinations = GetCombinations(otherCards);

    for (let i = 0; i < combinations.length; i++) {
        const combination = combinations[i];
        let fullCombinationGains = [0,0,0,0,0,0];
        let fullTotalGains = [0,0,0,0,0,0];
        trainingBonus += (combination.length + 1) * card.crowd_bonus;

        const combinationTrainingBonus = combination.reduce((current, c) => {
            let training = current + (c.tb - 1) + (combination.length * c.crowd_bonus);
            if (typeCount >= c.highlander_threshold)
                training += c.highlander_training;
            return training;
        }, 1);
        const combinationFriendshipBonus = combination.reduce((current, c) => {
            if (c.cardType === trainingType) {
                return current * c.fs_bonus * c.unique_fs_bonus;
            } else {
                return current;
            }
        }, 1);
        const combinationMotivationBonus = combination.reduce((current, c) => current + c.mb - 1, 1);
        
        for (let stat = 0; stat < 6; stat ++) {
            if (gains[stat] === 0) continue;
            if(!combination.some((r) => statCards.indexOf(r) > -1)) continue;
            
            const combinationStatBonus = combination.reduce((current, c) => current + c.stat_bonus[stat], 0);
            const base = gains[stat] + combinationStatBonus;

            let combinationGains = (base 
                * combinationTrainingBonus
                * (1 + weights.motivation * combinationMotivationBonus)
                * combinationFriendshipBonus
                * (1.05 * combination.length)
                * weights.umaBonus[stat]);
            
            let totalGains = 0;
            if (bonded) {
                totalGains = ((base + card.stat_bonus[stat] + card.fs_stats[stat])
                    * (combinationTrainingBonus + trainingBonus + card.fs_training - 1)
                    * (1 + weights.motivation * (combinationMotivationBonus + card.mb + card.fs_motivation - 1))
                    * (combinationFriendshipBonus * fsBonus)
                    * (1.05 * (combination.length + 1))
                    * weights.umaBonus[stat]);
            } else {
                totalGains = ((base + card.stat_bonus[stat])
                    * (combinationTrainingBonus + trainingBonus - 1)
                    * (1 + weights.motivation * (combinationMotivationBonus + card.mb - 1))
                    * (1.05 * (combination.length + 1))
                    * weights.umaBonus[stat]);
            }
            
            fullCombinationGains[stat] += combinationGains;
            fullTotalGains[stat] += totalGains;
        }
        trainingBonus -= (combination.length + 1) * card.crowd_bonus;
        if (GainsToScore(fullTotalGains, weights) > weights.minimum) {
            for (let stat = 0; stat < 6; stat ++) {
                trainingGains[stat] += (fullTotalGains[stat] - fullCombinationGains[stat]) 
                    * days
                    * CalculateCombinationChance(combinations[i], otherCards, trainingType)
                    * weights.multi;
            }
        }
    }

    return trainingGains;
}

function CalculateTrainingGain(
    gains: number[], 
    weights: CombinedWeights, 
    card: SupportCard, 
    otherCards: ProcessedCard[], 
    trainingType: number, 
    days: number, 
    rainbow: boolean, 
    typeCount: number
) {
    let trainingGains = [0,0,0,0,0,0,0];

    let trainingBonus = card.tb + card.fan_bonus * weights.fanBonus;
    if (typeCount >= card.highlander_threshold) trainingBonus += card.highlander_training;
    let fsBonus = 1;
    let motivationBonus = card.mb;
    if (rainbow) {
        fsBonus = card.fs_bonus * card.unique_fs_bonus;
        motivationBonus += card.fs_motivation;
        trainingBonus += card.fs_training;
    }

    let soloGain = [0,0,0,0,0,0];
    for (let stat = 0; stat < 6; stat ++) {
        if (gains[stat] === 0) continue;

        let base = gains[stat] + card.stat_bonus[stat];
        if (rainbow) {
            base += card.fs_stats[stat];
        }
        soloGain[stat] += (base 
            * trainingBonus
            * (1 + weights.motivation * motivationBonus)
            * fsBonus
            * 1.05
            * weights.umaBonus[stat]
            - gains[stat]);
    }
    if (GainsToScore(soloGain, weights) > weights.minimum) {
        for (let stat = 0; stat < 6; stat ++) {
            trainingGains[stat] += soloGain[stat]
                * days
                * CalculateCombinationChance([], otherCards, trainingType)
                * (rainbow ? weights.multi : 1);
        }
    }
    
    if (otherCards.length == 0) return trainingGains;

    const combinations = GetCombinations(otherCards);

    for (let i = 0; i < combinations.length; i++) {
        let fullCombinationGains = [0,0,0,0,0,0];
        let fullTotalGains = [0,0,0,0,0,0];
        trainingBonus += (combinations[i].length + 1) * card.crowd_bonus;

        const combinationTrainingBonus = combinations[i].reduce((current, c) => {
            let training = current + (c.tb - 1) + (combinations[i].length * c.crowd_bonus);
            if (typeCount >= c.highlander_threshold)
                training += c.highlander_training;
            return training;
        }, 1);
        const combinationFriendshipBonus = combinations[i].reduce((current, c) => {
            if (c.cardType === trainingType) {
                return current * c.fs_bonus * c.unique_fs_bonus;
            } else {
                return current;
            }
        }, 1);
        const combinationMotivationBonus = combinations[i].reduce((current, c) => current + c.mb - 1, 1);
        
        for (let stat = 0; stat < 6; stat ++) {
            if (gains[stat] === 0) continue;
            
            const combinationStatBonus = combinations[i].reduce((current, c) => current + c.stat_bonus[stat], 0);
            let base = gains[stat] + combinationStatBonus;
            if (rainbow) {
                base += card.fs_stats[stat];
            }

            let combinationGains = (base 
                * combinationTrainingBonus
                * (1 + weights.motivation * combinationMotivationBonus)
                * combinationFriendshipBonus
                * (1.05 * combinations[i].length)
                * weights.umaBonus[stat]);
                
            let totalGains = ((base + card.stat_bonus[stat])
                * (combinationTrainingBonus + trainingBonus - 1)
                * (1 + weights.motivation * (combinationMotivationBonus + motivationBonus - 1))
                * (combinationFriendshipBonus * fsBonus)
                * (1.05 * (combinations[i].length + 1))
                * weights.umaBonus[stat]);
            
            fullCombinationGains[stat] += combinationGains;
            fullTotalGains[stat] += totalGains;
        }
        trainingBonus -= (combinations[i].length + 1) * card.crowd_bonus;
        if (GainsToScore(fullTotalGains, weights) > weights.minimum) {
            for (let stat = 0; stat < 6; stat ++) {
                trainingGains[stat] += (fullTotalGains[stat] - fullCombinationGains[stat]) 
                    * days
                    * CalculateCombinationChance(combinations[i], otherCards, trainingType)
                    * (rainbow ? weights.multi : 1);
            }
        }
    }

    return trainingGains;
};

function CalculateCombinationChance(combination: ProcessedCard[], cards: ProcessedCard[] | undefined, trainingType: number) {
    let chance = combination.reduce((current, card) => {
        if (card.cardType === trainingType) {
            return current * card.rainbowSpecialty;
        } else {
            return current * card.offSpecialty;
        }
    }, 1);
    
    if (cards) {
        const otherCards = cards.filter((c) => combination.findIndex((d) => c.index == d.index) === -1);
        chance = otherCards.reduce((current, card) => {
            if (card.type === trainingType) {
                return current * (1 - card.rainbowSpecialty);
            } else {
                return current * (1 - card.offSpecialty);
            }
        }, chance);
    }

    return chance;
};