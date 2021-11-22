import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import Timeline from "./Timeline";
import Error from "./Error";

import { useParams } from "react-router-dom";

const initialState = {
  isLoading: true,
  status: null,
  userData: {
    username: "",
    name: "",
    player_id: null,
    joined: null,
  },
};

const Resultspage = () => {
  const { searchedUsername } = useParams();
  const [usernameInfo, setUsernameInfo] = useState({ ...initialState });

  useEffect(() => {
    const searchForUsername = async () => {
      let usernameResults;
      let userMatches;
      let userMatchArchiveTimes;
      try {
        usernameResults = await axios.get(
          `https://api.chess.com/pub/player/${searchedUsername}`
        );
        userMatchArchiveTimes = await axios.get(
          `https://api.chess.com/pub/player/${searchedUsername}/games/archives`
        );
      } catch (error) {
        console.log(error.response.status);
        setUsernameInfo({
          ...initialState,
          isLoading: false,
          status: error.response.status,
        });
        return;
      }
      setUsernameInfo({
        isLoading: false,
        status: usernameResults.status,
        userData: {
          joined: usernameResults.data.joined,
          username: usernameResults.data.username,
          name: usernameResults.data.name,
          player_id: usernameResults.data.player_id,
        },
      });
    };
    searchForUsername();
  }, [searchedUsername]);

  const loadingScreen = (
    <div className="loading-page">
      <Loading />
    </div>
  );

  return usernameInfo.isLoading ? (
    loadingScreen
  ) : usernameInfo.userData.player_id ? (
    <div className="results-page">
      <div>
        <h1 id="user-name">{usernameInfo.userData.name}</h1>
        <h3 id="user-username">Username: {usernameInfo.userData.username}</h3>
        <h3 id="user-player-id">
          Player ID: {usernameInfo.userData.player_id}
        </h3>
      </div>
      <Timeline />
    </div>
  ) : (
    <Error error={usernameInfo.status} />
  );
};
export default Resultspage;
