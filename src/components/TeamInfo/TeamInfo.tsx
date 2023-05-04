import React from "react";
import { SingleTeam } from "../../pages/Team/Team";
import classes from './TeamInfo.module.css';
import { replaceDash } from "../../utils/replace/replace/replace-";
import { convertTime } from "../../utils/convertTime";
import { useNavigate } from "react-router-dom";

interface TeamInfoProps {
    teamInfo: SingleTeam | null;
}

const TeamInfo: React.FC<TeamInfoProps> = props => {
    const navigate = useNavigate();

    const playerClickHandler = (playerId: number) => {
        navigate(`/player/${playerId}`)
    }

    const playersData =  props.teamInfo?.players ? props.teamInfo?.players.map((player) => (
        <tr key={player.id} onClick={() => playerClickHandler(player.id)}>
            <td>{player.name}</td>
            <td>{player.position}</td>
            <td>{player.nationality}</td>
            <td>{convertTime(player.dateOfBirth).date}</td>
        </tr>
    )) : null;

    return (
        <div className={classes.TeamInfoContainer}>
            <div className={classes.InfoContainer}>
                {/* Logo */}
                <img src={props.teamInfo?.crest} alt={props.teamInfo?.name} className={classes.Logo}/>
                {/* Team Name */}
                <h2>{props.teamInfo?.name + ' (' + props.teamInfo?.shortName + ')'}</h2>
                {/* Stadium */}
                <p><b>Stadium:</b> {props.teamInfo?.stadium}</p>
                {/* Address */}
                <p><b>Address:</b> {props.teamInfo?.address}</p>
                {/* Website */}
                <p className={classes.Website}><b>website:</b> <a href={props.teamInfo?.website} target="_blank" rel="noopener noreferrer">{props.teamInfo?.website}</a></p>
                {/* Year Found */}
                <p><b>Founded:</b> {props.teamInfo?.founded}</p>
                {/* CLub COlors */}
                <p><b>Club Colors:</b> {props.teamInfo?.clubColors}</p>
                {/* Coach Info */}
                <p><b>Coach:</b> {(props.teamInfo?.coachName ? props.teamInfo?.coachName : 'Unknown') + (props.teamInfo?.coachContractStart ? (' (' + replaceDash(props.teamInfo?.coachContractStart) + ' - ' + replaceDash(props.teamInfo?.coachContractEnd) + ')') : '')}</p>
                <p><b>Coach Nationality:</b> {props.teamInfo?.coachNationality}</p>
                {/* Last Updated */}
                <p><b>Last Updated:</b> {convertTime(props.teamInfo?.lastUpdated).date}</p>
            </div>

            <div className={classes.TableContainer}>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Position</th>
                            <th>Nationality</th>
                            <th>DOB</th>
                        </tr>
                    </thead>

                    <tbody>
                        {playersData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeamInfo;