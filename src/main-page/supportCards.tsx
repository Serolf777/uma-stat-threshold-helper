import { FC } from 'react';
import { NumberToStat } from '../shared/constants/constants.tsx';
import { SupportCardScore } from './constants/constants.tsx';

export interface SupportCardsProps {
    imgUrl: string;
    limitBreak: number;
    statType: number;
    alt: string;
    cardClicked: () => void;
    cardId: number;
    cardScores?: SupportCardScore[];
};

const SupportCards: FC<SupportCardsProps> = ({ imgUrl, limitBreak, statType, alt, cardClicked, cardId, cardScores }) => {
    let limitBreakString = "";
    let nonLimitBreakString = "";

    for (let n = 0; n < limitBreak; n++) {
        limitBreakString = limitBreakString + "◆";
    }

    for (let y = limitBreakString.length; y < 4; y++) {
        nonLimitBreakString = nonLimitBreakString + "◆";
    }

    let stat = (NumberToStat as Record<number, string>)[statType];

    let currentScore: SupportCardScore | undefined;
    if (cardScores) {
        currentScore = cardScores.find((umaCard) => umaCard.id === cardId);
    };

    return (
        <div className="support-card" onClick={cardClicked}>
            {currentScore &&
                <div className="temp-score">
                    {currentScore.score.toFixed(0)}
                </div>
            }
            <img src={`/cardImages/support_card_s_${cardId}.png`} alt={alt} height={100} />
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