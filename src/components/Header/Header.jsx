import React from "react";
import { Link } from "react-router-dom";
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.Header}>
      <ul className={classes.Menu}>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/caught">Пойманные покемоны</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header