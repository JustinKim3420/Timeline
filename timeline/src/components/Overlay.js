import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { burgerClick } from "../slices/burgerSlice";

const Overlay = () => {
  const dispatch = useDispatch();
  const burgerIsClicked = useSelector(state=>state.burger.value)

  const handleOverlayClick = (event) => {
    if (event.target.id === "overlay") {
      dispatch(burgerClick());
    }
  };

  return (
    <div
      id="overlay"
      className = {burgerIsClicked? 'clicked' : null}
      onClick={(event) => {
        handleOverlayClick(event);
      }}
    >
      <ul id="overlay-nav">
        <li className="overlay-nav-item">
          <Link to="/Chess" className="overlay-nav-link">
            Home
          </Link>
        </li>
        <li className="overlay-nav-item">
          <Link to="/Chess" className="overlay-nav-link">
            Chess
          </Link>
        </li>
        <li className="overlay-nav-item">
          <Link to="/Github" className="overlay-nav-link">
            Github
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Overlay;
