import { FC } from 'react';
import { NumberToStat } from '../shared/constants/constants.tsx';
import { SupportCard } from './cards/cards-interfaces.tsx';

export interface SupportCardsProps {
    limitBreak: number;
    statType: number;
    alt: string;
    cardClicked: () => void;
    cardId: number;
    cardScore?: number;
    charName: string;
    selectedCards?: SupportCard[];
};

const SupportCards: FC<SupportCardsProps> = ({ limitBreak, statType, alt, cardClicked, cardId, cardScore, charName, selectedCards }) => {
    let limitBreakString = "";
    let nonLimitBreakString = "";

    for (let n = 0; n < limitBreak; n++) {
        limitBreakString = limitBreakString + "◆";
    }

    for (let y = limitBreakString.length; y < 4; y++) {
        nonLimitBreakString = nonLimitBreakString + "◆";
    }

    const stat = (NumberToStat as Record<number, string>)[statType];

    let sameCharInDeck = false;
    if (selectedCards) {
        sameCharInDeck = selectedCards.some((card) => card.char_name === charName)
    }

    return (
        <div className={`support-card`} onClick={!sameCharInDeck ? cardClicked : () => {}}>
            {(cardScore && cardScore !== 0) ?
                <div className="card-score">
                    {cardScore.toFixed(0)}
                </div>
                : <></>
            }
            <img 
                src={`/cardImages/support_card_s_${cardId}.png`} 
                className={`${sameCharInDeck ? "in-deck" : "" }`}
                alt={alt} 
                height={100} 
            />
            <div className="limit-break">
                <div className="lb">
                    {limitBreakString}
                </div>
                <div className="non-lb">
                    {nonLimitBreakString}
                </div>
            </div>
            <img 
                src={`/statImages/${stat}.png`} 
                className={`stat-type ${stat}`} 
                alt={`stat-type ${stat}`} 
                height={25} 
            />
        </div>
    )
};

export default SupportCards;