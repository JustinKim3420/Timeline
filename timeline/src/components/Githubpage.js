import React from "react";

const Githubpage = () => {
  return (
    <div className="search-page">
        <i className="fab fa-github search-icon"></i>
        <form className='search-form'>
          <input className='search-input' type="text" placeholder='Search for a user...'/>
          <button className='search-button' type="submit">Search</button>
        </form>
    </div>
  );
};

export default Githubpage;
