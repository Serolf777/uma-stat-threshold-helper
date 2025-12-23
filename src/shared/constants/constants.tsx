import { Guts, Pal, Pow, Stam, Spd, Wit } from '../resources/index.ts';

export const staticUmaList = [
    "Oguri Cap",
    "Tamamo Cross",
    "Super Creek",
    "El Condor Pasa",
    "Gold Ship"
];

export const umaStats = [
    { 
        name: "Oguri Cap",
        statMods: [1.20, 1.00, 1.10, 1.00, 1.00]
    },
    { 
        name: "Tamamo Cross",
        statMods: [1.00, 1.20, 1.10, 1.00, 1.00]
    },
    { 
        name: "Super Creek",
        statMods: [1.00, 1.10, 1.00, 1.00, 1.20]
    },
    { 
        name: "El Condor Pasa",
        statMods: [1.20, 1.00, 1.00, 1.00, 1.10]
    },
    { 
        name: "Gold Ship",
        statMods: [1.00, 1.20, 1.10, 1.00, 1.00]
    }
];

export const Cards = {
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

export const cardTypes = [
    { 
        type: Cards.Spd,
        img: Spd,
        typeVal: 0
    },
    { 
        type: Cards.Stam,
        img: Stam,
        typeVal: 1
    },
    { 
        type: Cards.Pow,
        img: Pow,
        typeVal: 2
    },
    { 
        type: Cards.Guts,
        img: Guts,
        typeVal: 3
    },
    { 
        type: Cards.Wit,
        img: Wit,
        typeVal: 4
    },
    { 
        type: Cards.Pal,
        img: Pal,
        typeVal: 6
    },
];

export const statTypes = [
    { 
        type: Cards.Spd,
        typeVal: 0
    },
    { 
        type: Cards.Stam,
        typeVal: 1
    },
    { 
        type: Cards.Pow,
        typeVal: 2
    },
    { 
        type: Cards.Guts,
        typeVal: 3
    },
    { 
        type: Cards.Wit,
        typeVal: 4
    }
];