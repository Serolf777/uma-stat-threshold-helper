import { Guts, Pal, Pow, Stam, Spd, Wit } from '../resources/index.ts';

export const staticUmaList = [
    "Oguri Cap",
    "Tamamo Cross",
    "Super Creek",
    "El Condor Pasa",
    "Gold Ship"
]

export const defaultUserSettings = {
    NumberOfResults: "5",
    DefaultGenre: "All",
    Username: ""
};

export const defaultChatData = {
    defaultMessage: "How can I assist you today?"
}

export const defaultChatMsgs = [
    <div className="chatbot-response">
        {defaultChatData.defaultMessage}
    </div>
];

export const Stats = {
    Spd: "Speed",
    Stam: "Stamina",
    Pow: "Power",
    Guts: "Guts",
    Wit: "Wit",
    Pal: "Pal"
};

export const NumberToStat = {
    0: "Spd",
    1: "Stam",
    2: "Pow",
    3: "Guts",
    4: "Wit",
    5: "",
    6: "Pal"
};

export const statTypes = [
    { 
        type: Stats.Spd,
        img: Spd,
        typeVal: 0
    },
    { 
        type: Stats.Stam,
        img: Stam,
        typeVal: 1
    },
    { 
        type: Stats.Pow,
        img: Pow,
        typeVal: 2
    },
    { 
        type: Stats.Guts,
        img: Guts,
        typeVal: 3
    },
    { 
        type: Stats.Wit,
        img: Wit,
        typeVal: 4
    },
    {
        type: Stats.Pal,
        img: Pal,
        typeVal: 6
    }
];