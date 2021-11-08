import React from "react";
import { Link } from "react-router-dom";
import X from "./X";

import { useDispatch, useSelector } from "react-redux";
import { burgerClick } from "../slices/burgerSlice";

const Overlay = () => {
  const dispatch = useDispatch();
  const isBurgerClicked = useSelector((state) => state.burger.value);

  const handleOverlayClick = (event) => {
    if (event.target.id === "overlay") {
      dispatch(burgerClick());
      isBurgerClicked
        ? document.body.classList.remove("overlay")
        : document.body.classList.add("overlay");
    }
  };

  const handleNavClick = () => {
    dispatch(burgerClick());
    isBurgerClicked
      ? document.body.classList.remove("overlay")
      : document.body.classList.add("overlay");
  };

  return (
    <div
      id="overlay"
      className={isBurgerClicked ? "clicked" : null}
      onClick={(event) => {
        handleOverlayClick(event);
      }}
    >
      <ul id="overlay-nav" className={isBurgerClicked ? "clicked" : null}>
        <li className="overlay-nav-item" onClick={handleNavClick}>
          <Link to="/" className="overlay-nav-link">
            Home
          </Link>
        </li>
        <li className="overlay-nav-item">
          <Link
            to="/Chess"
            className="overlay-nav-link"
            onClick={handleNavClick}
          >
            Chess
          </Link>
        </li>
        <li className="overlay-nav-item">
          <Link
            to="/Github"
            className="overlay-nav-link"
            onClick={handleNavClick}
          >
            Github
          </Link>
        </li>
        <li className="overlay-nav-item">
          <Link
            to="/Apex"
            className="overlay-nav-link"
            onClick={handleNavClick}
          >
            Apex Legends
          </Link>
        </li>
      </ul>

      <X />
    </div>
  );
};

export default Overlay;
