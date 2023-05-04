import React, { Fragment, useEffect, useState } from "react";
import classes from './Team.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Match } from "../Home/Home";
import TeamMatches from "../../components/TeamMatches/TeamMatches";
import TeamInfo from "../../components/TeamInfo/TeamInfo";

interface Player {
    id: number,
    name: string,
    position: string,
    dateOfBirth: string,
    nationality: string
}

interface Staff {
    id: number,
    name: string,
    dateOfBirth: string
}

export interface SingleTeam {
    id: number,
    crest: string,  // logo
    name: string,
    shortName: string,
    address: string,
    website: string,    
    founded: number,
    clubColors: string,
    stadium: string | null,
    coachName: string,
    coachContractStart: string,
    coachContractEnd: string,
    coachNationality: string, 
    players: Player[],
    staffs: Staff[],
    lastUpdated: string
}

export interface MatchesStats {
    played: number,
    wins: number,
    draws: number,
    losses: number
}

const itemBar: ["Team Information", "Team Matches"] = ["Team Information", "Team Matches"];

const Team: React.FC = props => {
    const { teamId } = useParams();
    const [teamInfo, setTeamInfo] = useState<SingleTeam | null>(null);
    const [teamMatches, setTeamMatches] = useState<Match[]>([]);
    const [matchStats, setMatchStats] = useState<MatchesStats>();
    const [selectedMenuItem, setMenu] = useState<'Team Information' | 'Team Matches'>('Team Information');
    const navigate = useNavigate();
    
    useEffect(() => {   
        // get Team Info
        axios.get(`${process.env.REACT_APP_SERVER_URL}/one-team-info?teamId=${teamId}`)
        .then(response => {
            const data = response.data;
            const singleTeam: SingleTeam = {
                id: data.id,
                crest: data.crest,  // logo
                name: data.name,
                shortName: data.shortName,
                address: data.address,
                website: data.website,    
                founded: data.founded,
                clubColors: data.clubColors,
                stadium: data.venue ? data.venue : 'Unknown',
                coachName: data.coach.name,
                coachContractStart: data.coach.contract.start,
                coachContractEnd: data.coach.contract.until,
                coachNationality: data.coach.nationality, 
                players: data.squad,
                staffs: data.staff,
                lastUpdated: data.lastUpdated
            }
            setTeamInfo(singleTeam);
        })
        .catch(error => {
            console.log(error);
        });
           
        // get Team Matches
        axios.get(`${process.env.REACT_APP_SERVER_URL}/one-team-matches?teamId=${teamId}`)
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
                setTeamMatches(prevMatches => [...prevMatches, match]);
            });
            
            const matchStats: MatchesStats = {
                played: response.data.resultSet.played,
                wins: response.data.resultSet.wins,
                draws: response.data.resultSet.draws,
                losses: response.data.resultSet.losses
            }

            setMatchStats(matchStats);
        })
        .catch(error => {
            console.log(error);
        });
    }, [teamId])

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

            {/* Team Info */}
            {selectedMenuItem === "Team Information" ? 
            <TeamInfo 
                teamInfo={teamInfo}/>
            : null}

            {/* Team Matches */}
            {selectedMenuItem === "Team Matches" && matchStats? 
            <TeamMatches 
                teamName={teamInfo!.name}
                matches={teamMatches} 
                matchStats={matchStats}
                matchClickHandler={onMatchClickHandler}/>
            : null}

        </Fragment>
    )
}

export default Team;