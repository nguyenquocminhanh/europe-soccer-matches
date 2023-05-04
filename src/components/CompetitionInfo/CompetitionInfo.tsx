import React from "react";
import classes from './Competition.module.css';
import { Competition } from "../../pages/Competition/Competition";
import { convertTime } from "../../utils/convertTime";
import { useNavigate } from "react-router-dom";

interface CompetitionInfoProps {
    competitioninfo: Competition | null;
}

const CompetitionInfo: React.FC<CompetitionInfoProps> = props => {
    const navigate = useNavigate()
    const teamClickHandler = (teamId: number) => {
        navigate(`/team/${teamId}`)
    }

    const teamsData =  props.competitioninfo?.teams ? props.competitioninfo?.teams.map((team, index) => (
        <tr key={team.id} onClick={() => teamClickHandler(team.id)}>
            <td>{index + 1}</td>
            <td>{team.name}</td>
            <td><img src={team.crest} alt={team.name}/></td>
        </tr>
    )) : null;

    return (
        <div className={classes.TeamInfoContainer}>
            <div className={classes.InfoContainer}>
                {/* Logo */}
                <img src={props.competitioninfo?.emblem} alt={props.competitioninfo?.name} className={classes.Logo}/>
                {/* Competition Name */}
                <h2>{props.competitioninfo?.name}</h2>
                {/* Season */}
                <p><b>Season:</b> {props.competitioninfo?.season}</p>
                {/* Start Date */}
                <p><b>Start Date:</b> {convertTime(props.competitioninfo?.startDate).date}</p>
                {/* End Date */}
                <p><b>End Date:</b> {convertTime(props.competitioninfo?.endDate).date}</p>
                {/* Winner */}
                <p><b>Winner:</b> {props.competitioninfo?.winner !== null ? props.competitioninfo?.winner : 'Not Finished Yet'}</p>
            </div>

            <div className={classes.TableContainer}>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Team Name</th>
                            <th>Crest</th>
                        </tr>
                    </thead>

                    <tbody>
                        {teamsData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CompetitionInfo;