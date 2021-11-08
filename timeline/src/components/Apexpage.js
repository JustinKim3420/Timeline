import React from "react";

const Apexpage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="search-page">
      <i className="fas fa-chess-pawn search-icon"></i>
      <form className="search-form" onSubmit={(event) => handleSubmit(event)}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for a user..."
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Apexpage;
