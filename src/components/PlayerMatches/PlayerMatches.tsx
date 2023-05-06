import React from "react";
import { Match } from "../../pages/Home/Home";
import classes from './PlayerMatches.module.css'
import { convertTime } from "../../utils/convertTime";

interface PlayerMatchesProps {
    matches: Match[],
    matchClickHandler: (matchId: number) => void;
    playerName: string
}

const PlayerMatches: React.FC<PlayerMatchesProps> = props => {
    const data = props.matches.map(match => {
        return <tr key={match.id} onClick={() => props.matchClickHandler(match.id)}>
            {/* Date */}
            <td>{convertTime(match.date).date}</td>
            {/* Time */}
            <td>{convertTime(match.date).time}</td>
            {/* Home Team */}
            <td>
                <div className={classes.TableDataTeam}>
                    <img src={match.homeTeamCrest} alt={match.homeTeam}/>
                    <span style={{color: match.winner === 'AWAY_TEAM' ? '#70757a' : '#333'}}>{match.homeTeam !== null ? match.homeTeam : 'TBD'}</span>
                    {match.winner === 'HOME_TEAM' ? <div className={classes.RedArrow}></div> : null}
                </div>
            </td>
            <td>
                vs
            </td>
            {/* Away Team */}
            <td>
                <div className={classes.TableDataTeam}>
                    <img src={match.awayTeamCrest} alt={match.awayTeam}/>
                    <span style={{color: match.winner === 'HOME_TEAM' ? '#70757a' : '#333'}}>
                        {match.awayTeam !== null ? match.awayTeam : 'TBD'}
                        {/* Small arrow */}
                    </span>
                    {match.winner === 'AWAY_TEAM' ? <div className={classes.RedArrow}></div> : null}
                </div>
            </td>
            {/* Score */}
            <td>{match.homeScore !== null ? match.homeScore : '-'}:{match.awayScore !== null ? match.awayScore : '-'}</td>
            {/* Badge Status */}
            <td><span className={classes.Badge} style={{backgroundColor: match.status === 'TIMED' || match.status === 'SCHEDULED' ? "#007bff" : (match.status ===  "IN_PLAY"? "#A0DB8E" : "#794044") }}>{match.status}</span></td>
            {/* Competition */}
            <td>{match.competition === "Primera Division" ? "LaLiga" : match.competition}</td>
        </tr>
    })
    return (<div className={classes.TeamMatchesContainer}>
        <div className={classes.TeamName}>
            <h2>{props.playerName}'s Matches</h2>
        </div>
    
        <div className={classes.TableContainer}>

            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Home Team</th>
                        <th></th>
                        <th>Away Team</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Competition</th>
                    </tr>
                </thead>

                <tbody>
                    {data}
                </tbody>
            </table>

        </div>
    </div>
    )
}

export default PlayerMatches;