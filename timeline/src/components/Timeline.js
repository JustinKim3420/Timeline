import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "./Loading";
import TimelineEntry from "./TimelineEntry";

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

const ADDITIONAL_ENTRY_LIMIT = 10;

const Timeline = ({ userArchivedMatchesLinks, usernameInfo }) => {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [numberOfMatches, updateNumberOfMatches] = useState(0);
  const [allMatchData, updateMatchData] = useState({
    isLoading: true,
    matches: [],
  });
  const [indexOfCurrentMatch, setIndexOfCurrentMatch] = useState();
  const [indexOfCurrentArchive, setIndexOfCurrentArchive] = useState();

  const analyzeMatch = useCallback((match) => {
    let matchData;
    let isUserBlack =
      match.black.username.toLowerCase() ===
      usernameInfo.userData.username.toLowerCase();
      
    matchData = {
      ratingAtStart: isUserBlack ? match.black.rating : match.white.rating,
      result: isUserBlack
        ? RESULT_CODES[match.black.result] || "loss"
        : RESULT_CODES[match.white.result] || "loss",
      endTime: match.end_time,
      url: match.url,
      against: {
        username: isUserBlack ? match.white.username : match.black.username,
        rating: isUserBlack ? match.white.rating : match.black.rating,
      },
    };
    return matchData;
  });

  const addAdditionalEntries = async () => {
    let additionalMatches = [];
    let matchesTracked = 0;
    let currentArchive;
    //Go through each archived month from where it was left off
    for (
      let i = indexOfCurrentArchive;
      i < userArchivedMatchesLinks.length - 1;
      i++
    ) {
      //Get the additional info from the archive link
      try {
        currentArchive = await axios.get(userArchivedMatchesLinks[i]);
      } catch (e) {
        console.log(e);
        return;
      }
      for (
        let j = indexOfCurrentMatch;
        j < currentArchive.data.games.length - 1;
        j++
      ) {
        //Check to see if we have looked at all available matches
        //If true, that means we have no more matches to look at
        if (
          indexOfCurrentArchive === userArchivedMatchesLinks.length - 1 &&
          indexOfCurrentMatch === currentArchive.data.games.length - 1
        ) {
          if (additionalMatches.length > 0) {
            //Setting index to the max and this will prevent further data from
            //being loaded/ analyzed.
            setIndexOfCurrentArchive(i);
            setIndexOfCurrentMatch(j);
            setIsFetchingData(false);
            updateMatchData({
              isLoading: false,
              matches: allMatchData.matches.concat(additionalMatches),
            });
            return;
          } else {
            return;
          }
        }
        if (matchesTracked === ADDITIONAL_ENTRY_LIMIT) {
          setIndexOfCurrentMatch(j);
          break;
        }
        if(currentArchive.data.games[j].time_class!=='blitz'){
          continue;
        }
        additionalMatches.push(analyzeMatch(currentArchive.data.games[j]));
        matchesTracked += 1;
      }
      //If we have enough matches for the update, break out of for loop and update state
      if (matchesTracked === ADDITIONAL_ENTRY_LIMIT) {
        console.log("end of archive and met limit");
        setIndexOfCurrentArchive(i);
        updateMatchData({
          isLoading: false,
          matches: allMatchData.matches.concat(additionalMatches),
        });
        break;
      }
    }
    setIsFetchingData(false);
  };

  useEffect(() => {
    if (isFetchingData) {
      console.log(allMatchData)
      console.log("fetching data");
      addAdditionalEntries();
    }
  }, [isFetchingData]);

  document.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 100
    ) {
      setIsFetchingData(true);
    }
  });

  useEffect(() => {
    const initialMatchesLimit = 50;

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
        } else if (
          numberOfMatchesPlayed + numberOfMatchesPlayedThisMonth >=
          initialMatchesLimit
        ) {
          //Allows additional info to be added where it was left
          //When a new month is reached, this should reset
          setIndexOfCurrentMatch(i);
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
      for (let i = 0; i < userArchivedMatchesLinks.length - 1; i++) {
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
        } else if (numberOfMatchesPlayed >= initialMatchesLimit) {
          setIndexOfCurrentArchive(i);
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

  return allMatchData.isLoading ? (
    <div className="loading-page">
      <Loading />
    </div>
  ) : allMatchData.matches.length === 0 ? (
    <div>User has not played any matches</div>
  ) : (
    <div>
      <div className="timeline">
        {allMatchData.matches.map((matchData, index) => {
          const timelineEntry =
            index % 2 === 0 ? (
              <TimelineEntry
                matchData={matchData}
                isOdd={false}
                key={matchData.url}
              />
            ) : (
              <TimelineEntry
                matchData={matchData}
                isOdd={true}
                key={matchData.url}
              />
            );
          return timelineEntry;
        })}
      </div>
      {isFetchingData ? (
        <div className="loading-page">
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export default Timeline;
