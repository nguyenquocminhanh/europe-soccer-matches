import React from "react";
import classes from './PlayerInfo.module.css';
import { replaceDash } from "../../utils/replace/replace/replace-";
import { convertTime } from "../../utils/convertTime";
import { Player } from "../../pages/Player/Player";
import { Match } from "../../pages/Home/Home";
import Spinner from "../../ui/Spinner";

interface PlayerInfoProps {
    playerInfo: Player | null;
    matches: Match[];
    matchClickHandler: (matchId: number) => void;
    isLoading: boolean
}

const PlayerInfo: React.FC<PlayerInfoProps> = props => {
    const matchessData =  props.matches ? props.matches.map((match) => (
        <tr key={match.id} onClick={() => props.matchClickHandler(match.id)}>
            <td>{convertTime(match.date).date}</td>
            <td>{match.competition}</td>
            <td>{match.homeTeam}</td>
            <td>{match.awayTeam}</td>
            <td>{match.homeScore}:{match.awayScore}</td>
        </tr>
    )) : null;

    return (
        <div className={classes.TeamInfoContainer}>
            { props.isLoading ? <Spinner/> :
            <>
            <div className={classes.InfoContainer}>
                {/* Logo */}
                <img src={props.playerInfo?.teamCrest} alt={props.playerInfo?.teamName} className={classes.Logo}/>
                {/* Player Name */}
                <h2>{props.playerInfo?.name}</h2>
                {/* Team */}
                <p><b>Team:</b> {props.playerInfo?.teamName}</p>
                 {/* Position */}
                 <p><b>Position:</b> {props.playerInfo?.position}</p>
                {/* Shirt Number */}
                <p><b>Shirt Number:</b> {props.playerInfo?.shirtNumber}</p>
                {/* Contract */}
                <p><b>Contract:</b> {(props.playerInfo?.contractStart ? (' (' + replaceDash(props.playerInfo?.contractStart) + ' - ' + replaceDash(props.playerInfo?.contractEnd) + ')') : 'Unknown')}</p>
                {/* DOB */}
                <p><b>DOB:</b> {convertTime(props.playerInfo?.dateOfBirth).date}</p>
                {/* Nationality */}
                <p><b>Nationality:</b> {props.playerInfo?.nationality}</p>
                {/* Matches On Pitch */}
                <p><b>Matches On Pitch:</b> {props.playerInfo?.matchesOnPitch}</p>
                {/* Minutes Played */}
                <p><b>Minutes Played:</b> {props.playerInfo?.minutesPlayed}</p>
                {/* Goals */}
                <p><b>Goals:</b> {props.playerInfo?.goals}</p>
                {/* Assists */}
                <p><b>Assists:</b> {props.playerInfo?.assists}</p>
                {/* Penalties */}
                <p><b>Penalties:</b> {props.playerInfo?.penalties}</p>
                {/* Yellow Cards */}
                <p><b>Yellow Cards:</b> {props.playerInfo?.yellowCards}</p>
                {/* Yellow Red Cards */}
                <p><b>Yellow Red Cards:</b> {props.playerInfo?.yellowRedCards}</p>
                {/* Red Cards */}
                <p><b>Red Cards:</b> {props.playerInfo?.redCards}</p>
                {/* Last Updated */}
                <p><b>Last Updated:</b> {convertTime(props.playerInfo?.lastUpdated).date}</p>
            </div>

            <div className={classes.TableContainer}>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Competition</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {matchessData}
                    </tbody>
                </table>
            </div>
            </>
            }
        </div>
    )
}

export default PlayerInfo;