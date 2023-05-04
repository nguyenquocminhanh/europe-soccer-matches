import React, { useEffect, useState } from "react";
import classes from './Match.module.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { convertTime } from "../../utils/convertTime";
import { replaceUnderscrore } from "../../utils/replace_";
import { useNavigate } from 'react-router-dom';

interface SingleMatch {
    id: number,
    competition: string,
    competitionId: number,
    date: string,
    stage: string,
    homeTeam: string,
    homeTeamId: number,
    homeTeamCrest: string,    // logo
    awayTeam: string,
    awayTeamId: number,
    awayTeamCrest: string,
    homeScore: number | null,
    awayScore: number | null,
    referee: string,
    stadium: string
}

const Match: React.FC = props => {
    const { matchId } = useParams();
    const [match, setMatch] = useState<SingleMatch | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/one-match?matchId=${matchId}`)
        .then(response => {
            const data = response.data;

            const singleMatch: SingleMatch = {
                id: data.id,
                competition: data.competition.name,
                competitionId: data.competition.id,
                date: data.utcDate,
                stage: data.stage,
                homeTeam: data.homeTeam.name,
                homeTeamId: data.homeTeam.id,
                homeTeamCrest: data.homeTeam.crest,    // logo
                awayTeam: data.awayTeam.name,
                awayTeamId: data.awayTeam.id,
                awayTeamCrest: data.awayTeam.crest,
                homeScore: data.score.fullTime.home,
                awayScore: data.score.fullTime.away,
                referee: data.referees.length > 0 ? data.referees[0].name : 'TBD',
                stadium: data.venue ? data.venue : 'TBD'
            }

            setMatch(singleMatch);
        })
        .catch(error => {
            console.log(error);
        })
    }, [matchId]);

    const teamClickHandler = (teamId: undefined | number) => {
        navigate(`/team/${teamId}`);
    }

    const competitionClickHandler = (competitionId: undefined | number) => {
        navigate(`/competition/${competitionId}`);
    }

    return (
        <div className={classes.ResultPage}>
            <div className={classes.Form}> 
                {/* Competition */}
                <div className={classes.Competition}>
                    <span className={classes.League} onClick={() => {competitionClickHandler(match?.competitionId)}}>{match?.competition === 'Primera Division' ? 'LaLiga' : match?.competition}</span>
                    &nbsp; &nbsp;
                    {match?.date ? <span>{convertTime(match?.date).date}, {convertTime(match?.date).time}</span> : null}
                </div>    

                <div className={classes.StatsContainer}>    
                    {/* Home Team */}
                    <div className={classes.TeamContainer}>  
                        <img src={match?.homeTeamCrest} alt={match?.homeTeam} className={classes.TeamLogo} />
                     
                        <div className={classes.TeamName} onClick={() => teamClickHandler(match?.homeTeamId)}>{match?.homeTeam}</div>
                    </div>

                    {/* Score & Stage */}
                    <div className={classes.GameDetails}>
                        <div className={classes.Score}>{match?.homeScore !== null && match?.homeScore !== undefined ? (match?.homeScore + "  -  " + match?.awayScore) : 'vs'}</div>
                        <div className={classes.Stage}>{match?.stage ? replaceUnderscrore(match?.stage) : null}</div>
                    </div>

                    {/* Away Team */}
                    <div className={classes.TeamContainer}>  
                        <img src={match?.awayTeamCrest} alt={match?.awayTeam} className={classes.TeamLogo} />
                      
                        <div className={classes.TeamName} onClick={() => teamClickHandler(match?.awayTeamId)}>{match?.awayTeam}</div>
                    </div>
                </div> 

                <hr></hr>

                <div className={classes.Competition}>
                    <div>Referee: {match?.referee}</div>
                    &nbsp; &nbsp; 
                    <div>Stadium: {match?.stadium}</div>
                </div>   
            </div>
        </div>
    )
}

export default Match;