import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from './Loading'
import TimelineEntry from './TimelineEntry'

const RESULT_CODES = {
  win: "win",
  checkmated: "loss",
  agreed: "draw",
  repitition: "draw",
  timeout: "loss",
  resigned: "loss",
  stalemate: "draw",
  lose: "loss",
  insufficient: "draw",
  "50move": "draw",
  abandoned: "loss",
  kingofthehill: "loss",
  threecheck: "loss",
  timevsinsufficient: "draw",
  bughousepartnerlose: "loss",
};

const Timeline = ({ userArchivedMatchesLinks, usernameInfo }) => {
  const [numberOfMatches, updateNumberOfMatches] = useState(0);
  const [allMatchData, updateMatchData] = useState({
    isLoading: true,
    matches: [],
  });
  const [indexOfCurrentMatch, setIndexOfCurrentMatch] =
    useState();
  const [indexOfCurrentArchive, setIndexOfCurrentArchive] = useState();

  useEffect(() => {
    const initialMatchesLimit = 50;

    const analyzeMatch = (match) => {
      let matchData;
      if (
        match.black.username.toLowerCase() ===
        usernameInfo.userData.username.toLowerCase()
      ) {
        matchData = {
          ratingAtStart: match.black.rating,
          result: RESULT_CODES[match.black.result] || 'loss',
          endTime: match.end_time,
          against: {
            username:match.white.username,
            against:match.white.rating
          },
        };
      } else {
        matchData = {
          ratingAtStart: match.white.rating,
          result: RESULT_CODES[match.white.result] || 'loss',
          endTime: match.end_time,
          against: {
            username:match.black.username,
            against:match.black.rating
          }
        };
      }
      return matchData;
    };

    const getMatchHistoryInMonth = async (
      archiveForMonth,
      numberOfMatchesPlayed
    ) => {
      let matchesPlayedDuringMonth = [];
      let analyzedMatches = [];
      let numberOfMatchesPlayedThisMonth = 0;
      try {
        matchesPlayedDuringMonth = (await axios.get(archiveForMonth)).data
          .games;
      } catch (error) {
        console.log("Error accessing the match archives", error);
        return {
          analyzedMatches: [],
          numberOfMatchesPlayedThisMonth: 0,
        };
      }
      for (let i = 0; i < matchesPlayedDuringMonth.length; i++) {
        if (
          numberOfMatchesPlayed + numberOfMatchesPlayedThisMonth <
            initialMatchesLimit &&
          matchesPlayedDuringMonth[i].time_class === "blitz"
        ) {
          analyzedMatches.push(analyzeMatch(matchesPlayedDuringMonth[i]));
          numberOfMatchesPlayedThisMonth += 1;
        } else if (
          numberOfMatchesPlayed + numberOfMatchesPlayedThisMonth <
            initialMatchesLimit &&
          matchesPlayedDuringMonth[i].time_class !== "blitz"
        ) {
          continue;
        } else if(numberOfMatchesPlayed + numberOfMatchesPlayedThisMonth>=initialMatchesLimit){
          setIndexOfCurrentMatch(i)
          break;
        }
      }
      return {
        analyzedMatches: analyzedMatches,
        numberOfMatchesPlayedThisMonth: numberOfMatchesPlayedThisMonth,
      };
    };

    const initializeTimelineMatchesAscending = async () => {
      let matchesPlayedDuringMonths = [];
      let numberOfMatchesPlayed = 0;
      for (let i = 0; i < userArchivedMatchesLinks.length; i++) {
        //Get the analyzed matches and number of matches played for the current month
        if (numberOfMatchesPlayed < initialMatchesLimit) {
          const currentMonthData = await getMatchHistoryInMonth(
            userArchivedMatchesLinks[i],
            numberOfMatchesPlayed
          );
          matchesPlayedDuringMonths = matchesPlayedDuringMonths.concat(
            currentMonthData.analyzedMatches
          );
          numberOfMatchesPlayed +=
            currentMonthData.numberOfMatchesPlayedThisMonth;
        }else if(numberOfMatchesPlayed >= initialMatchesLimit){
          setIndexOfCurrentArchive(i)
          break;
        }
      }
      //Updating the state to include the initial data
      updateNumberOfMatches(allMatchData + numberOfMatches);
      updateMatchData({
        isLoading: false,
        matches: matchesPlayedDuringMonths,
      });
    };
    //Display the first 50 matches played by the user.
    initializeTimelineMatchesAscending();
  }, [userArchivedMatchesLinks, usernameInfo.userData.username]);

  console.log(allMatchData);

  return allMatchData.isLoading
    ? <div className = "loading-page"><Loading /></div>
    : allMatchData.matches.length===0 
      ? <div>
        User has not played any matches
      </div>
      : <div className = "timeline">
        <TimelineEntry isOdd={true}/>
        <TimelineEntry isOdd={false}/>
      </div>
};

export default Timeline;
