import { FC, MouseEvent, useState, useMemo, useEffect } from 'react';
import './uma-project.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Dropdown from '../shared/dropdown.tsx';
import { staticUmaList, cardTypes, statTypes, umaStats } from '../shared/constants/constants.tsx';
import SupportCards from './supportCards.tsx';
import cards from './cards/cards.tsx';
import { RarityFilter, SupportCardWithScore } from './cards/cards-interfaces.tsx';
import { defaultCardsSelected, defaultLbFilter, SupportCardScore } from './constants/constants.tsx';
import { SupportCard } from './cards/cards-interfaces.tsx';
import processCards, { CalculateDeckGains } from './utilities/processCards.jsx';
import { CardStats, defaultAoharuState, ScenarioStates } from './constants/scenarios.tsx';
import { NumberToStatFull } from '../shared/constants/constants.tsx';

const UmaProject: FC = () => {
    const methods = useForm();
    const { getValues, setValue, register } = methods;
    const [raritiesFilter, setRaritiesFilter] = useState<RarityFilter[]>(defaultLbFilter);
    const [statSelected, setStatSelected] = useState<number | null>(0);
    const [selectedCards, setSelectedCards] = useState<SupportCard[]>(defaultCardsSelected);
    const [umaSelected, setUmaSelected] = useState<string>("Oguri Cap");
    const [umaScores, setUmaScores] = useState<SupportCardScore[]>([]);
    const [avgStatGains, setAvgStatGains] = useState([0,0,0,0,0,0,0]);
    const [currentScenario, setCurrentScenario] = useState(defaultAoharuState);
    const [highRollChance, setHighRollChance] = useState<number>(0);
    const updatedCards: SupportCardWithScore[] = cards.map(card => ({...card,  score: 0 }));

    function optionSelected(option : string) {
        setUmaSelected(option);
        console.log(`option selected: ${option}`);
    };

    useEffect(() => {
        const statKey = statSelected === null ? undefined : (NumberToStatFull as Record<number, string>)[statSelected];

        if (statKey && currentScenario.currentState !== statKey) {
            if (statKey.toLowerCase() === "wit") {
                setCurrentScenario({ ...currentScenario,
                    currentState: "wisdom"
                });
            } else if (statKey.toLowerCase() === "pal") {
                setCurrentScenario({ ...currentScenario,
                    currentState: "friend"
                });
            } else {
                setCurrentScenario({ ...currentScenario,
                    currentState: statKey.toLowerCase()
                });
            }
        }
    }, [currentScenario.currentState, statSelected]);

    useEffect(() => {
        const selectedUma = umaStats.find((uma) => uma.name.toLowerCase() === umaSelected.toLowerCase());
        
        if (selectedUma) {
            const updatedBonus = currentScenario.general;
            statTypes.forEach((stat, i) => {
                updatedBonus.umaBonus[i] = parseFloat(selectedUma.statMods[i].toFixed(2));
                setValue(`uma-bonus-${stat.type}`, selectedUma.statMods[i].toFixed(2));
            });

            setCurrentScenario({ ...currentScenario,
                general: updatedBonus
            });
        }
    }, [umaSelected])

    function statCardClicked(e: MouseEvent<HTMLDivElement>, statType: number) {
        e.preventDefault();

        if (!e.currentTarget.classList.contains("active")) {
            e.currentTarget.classList.add('active');
            setStatSelected(statType);
        } else {
            e.currentTarget.classList.remove('active');
            setStatSelected(null);
        }
    };

    function rarityCheckBoxHandler(rarity: number, lb: number) {
        const targetedFilter = raritiesFilter.find((filter) => filter.rarity === rarity);

        if (targetedFilter && targetedFilter.rarity === rarity && !targetedFilter.lb.includes(lb)) {
            targetedFilter.lb.push(lb);
        } else if (targetedFilter && targetedFilter.rarity === rarity) {
            targetedFilter.lb = targetedFilter.lb.filter(number => number !== lb);
        }

        setRaritiesFilter(raritiesFilter.map(filter => {
            if (targetedFilter && filter.rarity === rarity) {
                return {...filter, lb: targetedFilter.lb } 
            } else {
                return filter;
            }
        }))
    };

    const filteredCards = useMemo(() => updatedCards.filter((card) => {
        const currentlyInDeck = selectedCards.some(currentCard => currentCard.id === card.id);
        if (umaScores) {
            const cardScore = umaScores.find((umaCard) => umaCard.id === card.id && umaCard.lb === card.limit_break);
            card.score = cardScore?.score ?? 0;
        }

        if (card.rarity == 1 && raritiesFilter[0].lb.includes(card.limit_break) && card.type == statSelected && !currentlyInDeck) {
            return true;
        } 
        else if (card.rarity == 2 && raritiesFilter[1].lb.includes(card.limit_break) && card.type == statSelected && !currentlyInDeck) {
            return true;
        }
        else if (card.rarity == 3 && raritiesFilter[2].lb.includes(card.limit_break) && card.type == statSelected && !currentlyInDeck) {
            return true;
        }
        return false;
    }), [raritiesFilter, statSelected, selectedCards, umaScores]);

    filteredCards.sort((a, b) => b.score - a.score);

    const totalRaceBonus = useMemo(() => selectedCards.reduce((total, card) => total + card.race_bonus, 0), 
    [selectedCards]);

    function supportCardAdd(card: SupportCard) {
        if (selectedCards.length < 6) {
            setSelectedCards([...selectedCards,
                card
            ])
        };
    };

    function supportCardRemove(card: SupportCard) {
        const updatedCards = selectedCards.filter(currentCard => currentCard.id !== card.id);
        setSelectedCards(updatedCards);
    };

    function handleSubmitData() {
        const currentStateKey = currentScenario.currentState as keyof ScenarioStates;

        const scenario: CardStats = currentScenario[currentStateKey as keyof ScenarioStates] as CardStats;

        const combinedWeights = {
            ...scenario,
            ...currentScenario.general
        };

        setUmaScores(processCards(filteredCards, combinedWeights, selectedCards));

        const targetStats = statTypes.map((stat) => {
            return Number(getValues(`uma-target-${stat.type}`));
        });
        const deckGains = CalculateDeckGains(combinedWeights, selectedCards, targetStats);

        setAvgStatGains(deckGains.effectiveGains);
        setHighRollChance(deckGains.highRollChance);
    };

    function umaBonusChanged(val: string, index: number) {
        if (val) {
            const updatedBonus = currentScenario.general;
            updatedBonus.umaBonus[index] = parseFloat(val);

            setCurrentScenario({ ...currentScenario,
                general: updatedBonus
            });
        }
    };

    return (
        <div className="uma-project-container">
            <div className="uma-project-page">
                <div className="uma-project-header">
                    Uma Project
                </div>
                <div>
                    This will provide suggested cards based on your requested stat requirements.
                </div>
                <FormProvider { ...methods }>
                    <form className="uma-project-form" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <div className="card-type">
                                {cardTypes.map(statType => 
                                    {
                                        return (
                                            <div 
                                                className={`stat-card ${statType.type} ${statType.typeVal == statSelected  ? "active" : "" }`} 
                                                onClick={(e) => statCardClicked(e, statType.typeVal)}
                                                id={`${statType.type}-card`}
                                                key={`${statType.type}-card`}
                                            >
                                                <img
                                                    src={statType.img} 
                                                    height="50px" 
                                                    alt={statType.type}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="uma-bonuses-container">
                                <div className="uma-bonuses-header">
                                    <div className="bonus-header-msg">
                                        Uma Bonuses
                                    </div>
                                    <div className="bonus-header-helper-note">
                                        The percentages on the uma's stat screen, converted to decimal. 
                                    </div>
                                </div>
                                    <div className="uma-bonuses">
                                        {statTypes.map((stat, i) => 
                                            {
                                                return (
                                                    <div key={`uma-bonus-${stat.type}`}>
                                                        <label>
                                                            {stat.type}
                                                        </label>
                                                        <input 
                                                            type="number" 
                                                            defaultValue="1.06" 
                                                            min="1.00" 
                                                            max="1.30" 
                                                            step=".01" 
                                                            className={`uma-bonus-${stat.type}`} 
                                                            {...register(`uma-bonus-${stat.type}`)}
                                                            onChange={(e) => umaBonusChanged(e.target.value, i)}
                                                        />
                                                    </div>)
                                            }
                                        )}
                                    </div>
                            </div>

                            <div className="stats-container">
                                <div className="stats-container-header">
                                    Target Stats
                                </div>
                                <div className="stats-target">
                                    {statTypes.map(statType => 
                                        {
                                            return (
                                                <div key={`stats-target-${statType.type}`}>
                                                    <label>
                                                        {statType.type}
                                                    </label>
                                                    <input 
                                                        type="number" 
                                                        defaultValue="600" 
                                                        min="0" 
                                                        max="1200" 
                                                        className={`uma-target-${statType.type}`} 
                                                        {...register(`uma-target-${statType.type}`)}
                                                    />
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <Dropdown 
                            customPrompt="Uma Musume" 
                            dropdownOptions={staticUmaList}
                            onChangeHandler={optionSelected}
                        />
                        <div className="card-filters-container">
                            <div className="ssr-filter-container">
                                <div className="ssr-filter-header">
                                    SSR
                                </div>
                                {Array.from({ length: 5 }, (_, i) => 4 - i).map((lb, i) => {
                                    return (
                                        <div className="checkbox-container" key={`ssr-lb-${lb}`}>
                                            <div className="lb">
                                                {Array.from({ length: lb }, (_, i) => `◆`).join('')}
                                            </div>
                                            <div className="non-lb">
                                                {Array.from({ length: 4 - lb }, (_, i) => `◆`).join('')}
                                            </div>
                                            <input type="checkbox" defaultChecked={i === 0 ? true : false} onClick={() => rarityCheckBoxHandler(3, lb)} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="sr-filter-container">
                                <div className="sr-filter-header">
                                    SR
                                </div>
                                {Array.from({ length: 5 }, (_, i) => 4 - i).map((lb, i) => {
                                    return (
                                        <div className="checkbox-container" key={`ssr-lb-${lb}`}>
                                            <div className="lb">
                                                {Array.from({ length: lb }, (_, i) => `◆`).join('')}
                                            </div>
                                            <div className="non-lb">
                                                {Array.from({ length: 4 - lb }, (_, i) => `◆`).join('')}
                                            </div>
                                            <input type="checkbox" defaultChecked={i === 0 ? true : false} onClick={() => rarityCheckBoxHandler(2, lb)} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="r-filter-container">
                                <div className="r-filter-header">
                                    R
                                </div>
                                {Array.from({ length: 5 }, (_, i) => 4 - i).map((lb, i) => {
                                    return (
                                        <div className="checkbox-container" key={`ssr-lb-${lb}`}>
                                            <div className="lb">
                                                {Array.from({ length: lb }, (_, i) => `◆`).join('')}
                                            </div>
                                            <div className="non-lb">
                                                {Array.from({ length: 4 - lb }, (_, i) => `◆`).join('')}
                                            </div>
                                            <input type="checkbox" defaultChecked={i === 0 ? true : false} onClick={() => rarityCheckBoxHandler(1, lb)} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button type="submit" value="submit" onClick={handleSubmitData}> 
                            Submit 
                        </button>
                    </form>
                </FormProvider>
                <div className="uma-cards-container">
                    <div className="selected-deck-container">
                        <div className="selected-deck-header">
                            Currently Selected Deck
                        </div>
                        <div className="selected-deck">
                            {selectedCards.map((card) =>
                                {
                                    return (
                                        <SupportCards 
                                            limitBreak={card.limit_break}
                                            statType={card.type}
                                            alt={`${card.char_name}`}
                                            cardClicked={() => supportCardRemove(card)}
                                            cardId={card.id}
                                            charName={card.char_name}
                                            key={`${card.id}-${card.limit_break}`}
                                        />)
                                })
                            }
                        </div>
                        <div className="avg-stat-gains-container">
                            <div className="avg-stat-gains-header">
                                Average Stat Gains
                            </div>
                            <div className="avg-stat-gains">
                                {statTypes.map((statType, i) => {
                                    return <div className="avg-stat-gain" key={`avg-stat-gain-${statType.type}`}>{statType.type}: {avgStatGains[i].toFixed(0)}</div>
                                })}
                            </div>
                        </div>
                        <div className="high-roll-chance">
                                High Roll Chance : {(highRollChance * 100).toFixed(2)} %
                        </div>
                        <div className="total-race-bonus">
                            Total Race Bonuses : {totalRaceBonus}
                        </div>
                    </div>
                    <div className="selected-card-type-container">
                        <div className="selected-card-type-header">
                            Select a Support Card To Add to your deck
                        </div>
                        <div className="selected-card-type">
                            {filteredCards.map((card) =>
                                {
                                    return (
                                        <SupportCards 
                                            limitBreak={card.limit_break}
                                            statType={card.type}
                                            alt={`${card.char_name}`}
                                            cardClicked={() => supportCardAdd(card)}
                                            cardId={card.id}
                                            cardScore={card.score}
                                            charName={card.char_name}
                                            selectedCards={selectedCards}
                                            key={`${card.id}-${card.limit_break}`}
                                        />)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UmaProject;