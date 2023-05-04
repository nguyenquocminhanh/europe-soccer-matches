import React from "react";
import { Match } from "../../pages/Home/Home";
import classes from './TeamMatches.module.css'
import { convertTime } from "../../utils/convertTime";
import { MatchesStats } from "../../pages/Team/Team";

interface TeamMatchesProps {
    matches: Match[],
    matchClickHandler: (matchId: number) => void;
    matchStats: MatchesStats,
    teamName: string
}

const TeamMatches: React.FC<TeamMatchesProps> = props => {
    const data = props.matches.map(match => {
        return <tr key={match.id} onClick={() => props.matchClickHandler(match.id)}>
            {/* Date */}
            <td>{convertTime(match.date).date}</td>
            {/* Time */}
            <td>{convertTime(match.date).time}</td>
            {/* Badge Status */}
            <td><span className={classes.Badge} style={{backgroundColor: match.status === 'TIMED' || match.status === 'SCHEDULED' ? "#007bff" : (match.status ===  "IN_PLAY"? "#A0DB8E" : "#794044") }}>{match.status}</span></td>
            {/* Competition */}
            <td>{match.competition === "Primera Division" ? "LaLiga" : match.competition}</td>
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
        </tr>
    })
    return (<div className={classes.TeamMatchesContainer}>
        <div className={classes.TeamName}>
            <h2>{props.teamName}'s Matches</h2>
        </div>
        <div className={classes.MatchStats}>
            <div>
                <h4>Played: {props.matchStats.played}</h4>
            </div>

            <div>
                <h4>Wins: {props.matchStats.wins}</h4>
            </div>

            <div>
                <h4>Draws: {props.matchStats.draws}</h4>
            </div>

            <div>
                <h4>Losses: {props.matchStats.losses}</h4>
            </div>
        </div>

        <div className={classes.TableContainer}>

            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Competition</th>
                        <th>Home Team</th>
                        <th></th>
                        <th>Away Team</th>
                        <th>Score</th>
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

export default TeamMatches;