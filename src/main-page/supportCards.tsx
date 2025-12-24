import { FC } from 'react';
import { NumberToStat } from '../shared/constants/constants.tsx';

export interface SupportCardsProps {
    limitBreak: number;
    statType: number;
    alt: string;
    cardClicked: () => void;
    cardId: number;
    cardScore?: number;
    sameCharInDeck?: boolean;
};

const SupportCards: FC<SupportCardsProps> = ({ limitBreak, statType, alt, cardClicked, cardId, cardScore, sameCharInDeck }) => {
    let limitBreakString = "";
    let nonLimitBreakString = "";

    for (let n = 0; n < limitBreak; n++) {
        limitBreakString = limitBreakString + "◆";
    }

    for (let y = limitBreakString.length; y < 4; y++) {
        nonLimitBreakString = nonLimitBreakString + "◆";
    }

    let stat = (NumberToStat as Record<number, string>)[statType];

    return (
        <div className={`support-card`} onClick={!sameCharInDeck ? cardClicked : () => {}}>
            {(cardScore && cardScore !== 0) ?
                <div className="temp-score">
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
            {!sameCharInDeck &&
                <img 
                    src={`/statImages/${stat}.png`} 
                    className={`stat-type ${stat}`} 
                    alt={`stat-type ${stat}`} 
                    height={25} 
                />
            }
        </div>
    )
};

export default SupportCards;