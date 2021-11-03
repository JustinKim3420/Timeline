import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import {burgerClick} from '../slices/burgerSlice'

const Burger = () => {
  const dispatch = useDispatch()
  const isBurgerClicked = useSelector(state=>state.burger.value)

    const handleClick = ()=>{
        dispatch(burgerClick())
    }

  return (
    <button id="burger" onClick={()=>{handleClick()}}>
      <div className={"burger-line" + (isBurgerClicked? " rotated":'')}></div>
      <div className={"burger-line" + (isBurgerClicked? " rotated":'')}></div>
      <div className={"burger-line" + (isBurgerClicked? " rotated":'')}></div>
    </button>
  );
};

export default Burger;
