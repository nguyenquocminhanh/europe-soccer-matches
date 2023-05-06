import React, { Fragment, useEffect, useState } from "react";
import classes from './Player.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Match } from "../Home/Home";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";
import PlayerMatches from "../../components/PlayerMatches/PlayerMatches";

export interface Player {
    id: number,
    name: string,
    teamName: string,
    teamCrest: string,
    shirtNumber: string | null,
    position: string,
    dateOfBirth: string,
    nationality: string,
    matchesOnPitch: number,
    minutesPlayed: number,
    goals: number,
    assists: number,
    penalties: number,
    yellowCards: number,
    yellowRedCards: number,
    redCards: number,
    contractStart: string,
    contractEnd: string,
    lastUpdated: string
}

export interface MatchesStats {
    played: number,
    wins: number,
    draws: number,
    losses: number
}

const itemBar: ["Player Information", "Player Matches"] = ["Player Information", "Player Matches"];

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Player: React.FC = props => {
    const { playerId } = useParams();
    const [playerInfo, setPlayerInfo] = useState<Player>();
    const [playerMatches, setPlayerMatches] = useState<Match[]>([]);
    const [selectedMenuItem, setMenu] = useState<'Player Information' | 'Player Matches'>('Player Information');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {         
        setIsLoading(true);
        // get Player Matches
        axios.get(`${process.env.REACT_APP_SERVER_URL}/one-player-matches?playerId=${playerId}`)
        .then(response => {
            response.data.matches.forEach((item: { id: any; utcDate: any; competition: { name: any; }; status: any; stage: any; homeTeam: { name: any; id: any; crest: any; }; awayTeam: { name: any; id: any; crest: any; }; score: { fullTime: { home: any; away: any; }; winner: any; }; }) => {
                const match: Match = {
                    id: item.id,
                    date: item.utcDate,
                    competition: item.competition.name,
                    status: item.status,
                    stage: item.stage,
                    homeTeam: item.homeTeam.name,
                    homeTeamId: item.homeTeam.id,
                    homeTeamCrest: item.homeTeam.crest,    // logo
                    awayTeam: item.awayTeam.name,
                    awayTeamId: item.awayTeam.id,
                    awayTeamCrest: item.awayTeam.crest,
                    homeScore: item.score.fullTime.home,
                    awayScore: item.score.fullTime.away,
                    winner: item.score.winner
                }
                setPlayerMatches(prevMatches => [...prevMatches, match]);
            });

            const matchesOnPitch = response.data.aggregations.matchesOnPitch;
            const goals = response.data.aggregations.goals;
            const minutesPlayed = response.data.aggregations.minutesPlayed;
            const assists = response.data.aggregations.assists;
            const penalties = response.data.aggregations.penalties;
            const yellowCards = response.data.aggregations.yellowCards;
            const yellowRedCards = response.data.aggregations.yellowRedCards;
            const redCards = response.data.aggregations.redCards;

            // get Player Info
            axios.get(`${process.env.REACT_APP_SERVER_URL}/one-player-info?playerId=${playerId}`)
            .then(response => {
                const data = response.data;
                const player: Player = {
                    id: data.id,
                    name: data.name,
                    teamName: data.currentTeam.name,
                    teamCrest: data.currentTeam.crest,
                    shirtNumber: data.shirtNumber,
                    position: data.position,
                    dateOfBirth: data.dateOfBirth,
                    nationality: data.nationality,
                    matchesOnPitch: matchesOnPitch,
                    minutesPlayed: minutesPlayed,
                    goals: goals,
                    assists: assists,
                    penalties: penalties,
                    yellowCards: yellowCards,
                    yellowRedCards: yellowRedCards,
                    redCards: redCards,
                    contractStart: data.currentTeam.contract.start,
                    contractEnd: data.currentTeam.contract.until,
                    lastUpdated: data.lastUpdated
                };
                
                setPlayerInfo(player);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    }, [playerId])

    const onMatchClickHandler = (matchId: number) => {
        navigate(`/match/${matchId}`);
    }

    const menuItems = itemBar.map(item => {
        return <div 
            key={item} 
            className={classes.barItem}
            style={{backgroundColor: item === selectedMenuItem ? 'black' : 'gray'}}
            onClick={() => setMenu(item)}>
                {item}
        </div>
    })

    return (
        <Fragment>
            {/* Menu Bar */}
            <div className={classes.Bar}>
                {menuItems}
            </div>

            {/* Player Info */}
            {selectedMenuItem === "Player Information" ? 
            <PlayerInfo 
                isLoading={isLoading}
                playerInfo={playerInfo!}
                matches={playerMatches}
                matchClickHandler={onMatchClickHandler}/>
            : null}

            {/* Player Matches */}
            {selectedMenuItem === "Player Matches" && playerMatches? 
            <PlayerMatches 
                playerName={playerInfo!.name}
                matches={playerMatches} 
                matchClickHandler={onMatchClickHandler}/>
            : null}

        </Fragment>
    )
}

export default Player;