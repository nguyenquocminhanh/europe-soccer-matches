import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import HorizontalBar from "../../components/HorizontalBar/HorizontalBar";
import ScoreTable from "../../components/ScoreTable/ScoreTable";
import { useNavigate } from 'react-router-dom';

export interface Match {
  id: number,
  date: string,
  competition: string,
  status: string,
  stage: string,
  homeTeam: string,
  homeTeamId: number,
  homeTeamCrest: string,    // logo
  awayTeam: string,
  awayTeamId: number,
  awayTeamCrest: string,
  homeScore: number,
  awayScore: number,
  winner: "HOME_TEAM" | "DRAW" | "AWAY_TEAM" | null
}

const Home: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isButtonHidden, setButtonHidden] = useState<boolean>(true);
  const [leagueCode, setLeagueCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    onSelectLeagueHandler('PL', false);
  }, [])

  const onSelectLeagueHandler = (leagueCode: string | null, showAllMatch: boolean) => {
    setIsLoading(true);
    // clear Match
    setMatches([]);
    setButtonHidden(true);
    setLeagueCode(leagueCode);

    axios.get(`${process.env.REACT_APP_SERVER_URL}/all-match?leagueCode=${leagueCode}&showAllMatch=${showAllMatch}`)
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
        setMatches(prevMatches => [...prevMatches, match]);
      })
      setIsLoading(false);
      setButtonHidden(showAllMatch ? true: false);
    })
    .catch(err => {
      setIsLoading(false)
      console.log(err);
    })
  }

  const onMatchClickHandler = (matchId: number) => {
    navigate(`/match/${matchId}`);
  }

  return (
    <Fragment>
        <HorizontalBar onSelectLeague={onSelectLeagueHandler}/>

        <ScoreTable matches={matches}
            isButtonHidden={isButtonHidden} 
            arrowClickHandler={() => onSelectLeagueHandler(leagueCode, true)}
            matchClickHandler={onMatchClickHandler}
            isLoading={isLoading}/>
    </Fragment>
  )
}

export default Home;