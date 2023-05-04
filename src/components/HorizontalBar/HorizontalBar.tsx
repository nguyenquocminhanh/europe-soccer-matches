import React, { useState } from "react";
import classes from './HorizontalBar.module.css';

interface Competition  {
    name: string,
    code: string
}

const competitions: Competition[] = [
    {
        name: "UEFA Champions League",
        code: "CL",

    },
    {
        name: "Premier League",
        code: "PL"
    },
    {
        name: "LaLiga",
        code: "PD"
    },
    {
        name: "Bundesliga",
        code: "BL1",
    },
    {
        name: "Serie A",
        code: "SA"
    },
    {
        name: "Ligue 1",
        code: "FL1"
    }
];

interface HorizontalBarProps {
    onSelectLeague: (league: string, showAllMatch: boolean) => void;
}

const HorizontalBar: React.FC<HorizontalBarProps> = props => {
    const [selectedLeague, setLeague] = useState<string | null>('PL');

    const clickHandler = (leagueCode: string) => {
        setLeague(leagueCode);
        props.onSelectLeague(leagueCode, false);
    }

    const competitionsElement = competitions.map(item => {
        return <div 
            key={item.code} 
            className={classes.barItem}
            style={{backgroundColor: item.code === selectedLeague ? 'black' : 'gray'}}
            onClick={() => clickHandler(item.code)}>
                {item.name}
        </div>
    })
    
    return (
        <div className={classes.Bar}>
            {competitionsElement}
        </div>
    )   
}

export default HorizontalBar