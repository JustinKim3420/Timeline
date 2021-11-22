import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Chesspage = () => {
  const [searchedUsername, setSearchedUsername] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/chess/results/${searchedUsername}`);
  };

  return (
    <div className="search-page">
      <i className="fas fa-chess-pawn search-icon"></i>
      <form className="search-form" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for a user..."
          value={searchedUsername}
          onChange={(event) => {
            setSearchedUsername(event.target.value);
          }}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Chesspage;
