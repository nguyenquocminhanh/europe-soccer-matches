import React, { Fragment, useEffect, useState } from "react";
import classes from './Competition.module.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { SingleTeam } from "../Team/Team";
import { Match } from "../Home/Home";
import CompetitionMatches from "../../components/CompetitionMatches/CompetitionMatches";
import CompetitionInfo from "../../components/CompetitionInfo/CompetitionInfo";

const itemBar: ["Competition Information", "Competition Matches"] = ["Competition Information", "Competition Matches"];

export interface Competition {
    id: number,
    name: string,
    season: string,
    emblem: string,     // logo,
    startDate: string,
    endDate: string,
    winner: string | null,
    teams: SingleTeam[],
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Competition: React.FC = props => {
    const { competitionId } = useParams();
    const [competitionInfo, setCompetitionInfo] = useState<Competition>();
    const [competitionMatches, setCompetitionMatches] = useState<Match[]>([]);
    const [selectedMenuItem, setMenu] = useState<'Competition Information' | 'Competition Matches'>('Competition Information');
    const [isLoading, setIsloading] = useState<boolean>(false);
    const navigate = useNavigate();

        
    useEffect(() => {   
        setIsloading(true);
        // get Competition Info
        axios.get(`${process.env.REACT_APP_SERVER_URL}/one-competition?competitionId=${competitionId}`)
        .then(response => {
            const data = response.data;
            const competitionData: Competition = {
                id: data.competition.id,
                name: data.competition.name,
                season: data.filters.season,
                emblem: data.competition.emblem,
                startDate: data.season.startDate,    
                endDate: data.season.endDate,
                winner: data.season.winner,
                teams: data.teams 
            }
            setCompetitionInfo(competitionData);
            const leagueCode = data.competition.code;

            // get competition matches
            axios.get(`${process.env.REACT_APP_SERVER_URL}/all-match?leagueCode=${leagueCode}&showAllMatch=true`)
            .then(response => {
                response.data.matches.forEach((item: { id: number; utcDate: string; competition: { name: string; }; status: string; stage: string; homeTeam: { name: string; id: number; crest: string; }; awayTeam: { name: string; id: number; crest: string; }; score: { fullTime: { home: number; away: number; }; winner: "HOME_TEAM" | "DRAW" | "AWAY_TEAM" | null }; }) => {
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
                    setCompetitionMatches(prevMatches => [...prevMatches, match]);
                    setIsloading(false);
                })
            })
            .catch(err => {
                console.log(err);
                setIsloading(false);
            })
        })
        .catch(error => {
            console.log(error);
            setIsloading(false);
        });
    }, [competitionId])

    const menuItems = itemBar.map(item => {
        return <div 
            key={item} 
            className={classes.barItem}
            style={{backgroundColor: item === selectedMenuItem ? 'black' : 'gray'}}
            onClick={() => setMenu(item)}>
                {item}
        </div>
    })

    const onMatchClickHandler = (matchId: number) => {
        navigate(`/match/${matchId}`);
    }
    
    return (
        <Fragment>
            {/* Menu Bar */}
            <div className={classes.Bar}>
                {menuItems}
            </div>


            {/* Competition Info */}
            {selectedMenuItem === "Competition Information" ? 
            <CompetitionInfo 
                isLoading={isLoading}
                competitioninfo={competitionInfo!}/>
            : null}

            {/* Competition Matches */}
            {selectedMenuItem === "Competition Matches" && competitionMatches && competitionInfo? 
            <CompetitionMatches 
                competitionName={competitionInfo.name}
                matches={competitionMatches} 
                matchClickHandler={onMatchClickHandler}/>
            : null}
        </Fragment>
    )
}

export default Competition;