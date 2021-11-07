import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { burgerClick } from "../slices/burgerSlice";

const X = () => {
  const dispatch = useDispatch();
  const isBurgerClicked = useSelector((state) => state.burger.value);

  const handleXClick = () => {
    dispatch(burgerClick());
  };

  return (
    <button
      className={"x " + (isBurgerClicked ? "clicked" : null)}
      onClick={handleXClick}
    >
      <div className={"x-line"}></div>
      <div className={"x-line"}></div>
    </button>
  );
};

export default X;
