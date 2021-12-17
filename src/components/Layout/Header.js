import React from "react";

import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Hello Meals</h1>
        <HeaderCardButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full od delicious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
