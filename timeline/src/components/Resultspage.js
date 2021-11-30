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
    joined: null,
    blitzRating: null,
    username: "",
    name: "",
    player_id: null,
  },
};

const Resultspage = () => {
  const { searchedUsername } = useParams();
  const [usernameInfo, setUsernameInfo] = useState({ ...initialState });
  const [userArchivedMatchesLinks, setUserArchivedMatchesLinks] = useState({
    isLoading: true,
    archivedMatches: [],
  });
  const [profileImage, setProfileImage] = useState();
  console.log(userArchivedMatchesLinks);

  useEffect(() => {
    const getUserInfo = async () => {
      let usernameResults;
      try {
        usernameResults = await axios.get(
          `https://api.chess.com/pub/player/${searchedUsername}`
        );
        let userRating = await axios.get(
          `https://api.chess.com/pub/player/${searchedUsername}/stats`
        );
        console.log(userRating.data);
        console.log(usernameResults.data);
        setProfileImage(usernameResults.data.avatar);
        usernameResults = {
          isLoading: false,
          status: usernameResults.status,
          userData: {
            joined: usernameResults.data.joined,
            blitzRating: userRating.data.chess_blitz.last.rating,
            username: usernameResults.data.username,
            name: usernameResults.data.name,
            player_id: usernameResults.data.player_id,
          },
        };
      } catch (error) {
        console.log(error.response.status);
        usernameResults = {
          ...initialState,
          isLoading: false,
          status: error.response.status || null,
        };
      }
      setUsernameInfo(usernameResults);
    };
    const getArchivedMatches = async () => {
      let availableArchives;
      try {
        availableArchives = (
          await axios.get(
            `https://api.chess.com/pub/player/${searchedUsername}/games/archives`
          )
        ).data.archives;
      } catch (error) {
        console.log(error);
        availableArchives = [];
      }
      setUserArchivedMatchesLinks({
        isLoading: false,
        archivedMatches: availableArchives,
      });
    };
    getUserInfo();
    getArchivedMatches();
  }, [searchedUsername]);

  const loadingScreen = (
    <div className="loading-page">
      <Loading />
    </div>
  );
  return usernameInfo.isLoading || userArchivedMatchesLinks.isLoading ? (
    loadingScreen
  ) : usernameInfo.userData.player_id ? (
    <div className="results-page">
      <div className="header">
        <img src={profileImage} width="150" height="150" alt="Profile image" />
        <div className='user-info'>
          <h1 id="user-name">{usernameInfo.userData.name}</h1>
          <h2 id="user-blitz-rating">Current blitz rating: {usernameInfo.userData.blitzRating}</h2>
          <h3 id="user-username">Username: {usernameInfo.userData.username}</h3>
          <h3 id="user-player-id">
            Player ID: {usernameInfo.userData.player_id}
          </h3>
        </div>
      </div>
      <Timeline
        userArchivedMatchesLinks={userArchivedMatchesLinks.archivedMatches}
        usernameInfo={usernameInfo}
      />
    </div>
  ) : (
    <Error error={usernameInfo.status} />
  );
};
export default Resultspage;
