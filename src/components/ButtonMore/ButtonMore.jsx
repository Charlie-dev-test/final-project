import React from "react";
import PropTypes from 'prop-types'
import classes from './ButtonMore.module.css'

const ButtonMore = props => {
  return (
    <button 
      className={classes.More}
      onClick={props.onMorePokemons}
    >
      Загрузить еще
    </button>
  )
}

ButtonMore.propTypes = {
  onMorePokemons: PropTypes.func
}

ButtonMore.propTypes = {
  onMorePokemons: () => {}
}

export default ButtonMore