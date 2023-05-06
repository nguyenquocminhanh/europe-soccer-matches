import React, { Fragment, useEffect, useRef, useState } from "react";
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
  const [leagueCode, setLeagueCode] = useState<string>('PL');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const prevLeagueCodeRef = useRef('PL');

  useEffect(() => {
    onSelectLeagueHandler(prevLeagueCodeRef.current, false);

    const interval = setInterval(() => {
      onSelectLeagueHandler(prevLeagueCodeRef.current, false);
    }, 30000);

    return () => clearInterval(interval);
  }, [])

  const onSelectLeagueHandler = async (leagueCode: string, showAllMatch: boolean) => {
    setIsLoading(true);
    // clear Match
    setMatches([]);
    setButtonHidden(true);
    setLeagueCode(leagueCode);
    // set value of pervLeagueCodeRef for re-render page without change leaguecode
    prevLeagueCodeRef.current = leagueCode;

    const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/all-match?leagueCode=${leagueCode}&showAllMatch=${showAllMatch}`);

    result.data.matches.forEach((item: { id: number; utcDate: string; competition: { name: string; }; status: string; stage: string; homeTeam: { shortName: string; id: number; crest: string; }; awayTeam: { shortName: string; id: number; crest: string; }; score: { fullTime: { home: number; away: number; }; winner: "HOME_TEAM" | "DRAW" | "AWAY_TEAM" | null }; }) => {
      const match: Match = {
        id: item.id,
        date: item.utcDate,
        competition: item.competition.name,
        status: item.status,
        stage: item.stage,
        homeTeam: item.homeTeam.shortName,
        homeTeamId: item.homeTeam.id,
        homeTeamCrest: item.homeTeam.crest,    // logo
        awayTeam: item.awayTeam.shortName,
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
  }

  const onMatchClickHandler = (matchId: number) => {
    navigate(`/match/${matchId}`);
  }

  return (
    <Fragment>
        <HorizontalBar 
          onSelectLeague={onSelectLeagueHandler}
          leagueCode={leagueCode!}/>

        <ScoreTable matches={matches}
            isButtonHidden={isButtonHidden} 
            arrowClickHandler={() => onSelectLeagueHandler(leagueCode, true)}
            matchClickHandler={onMatchClickHandler}
            isLoading={isLoading}/>
    </Fragment>
  )
}

export default Home;