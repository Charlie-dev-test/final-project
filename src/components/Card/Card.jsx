import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import classes from './Card.module.css'

const Card = props => {
  return (
    <div className={classes.Card}>
      <Link to={`pokemons/${props.id}`}>
        <img 
          src={props.imgUrl}
          alt={props.name}
          onError ={ props.onLoseImg }
        />
      </Link>
      <h3>{props.name}</h3>
      <button 
        className={classes.Btn} 
        disabled={props.caught}
        onClick={props.onAction}
      >{props.btn}</button>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  onLoseImg: PropTypes.func,
  name: PropTypes.string,
  caught: PropTypes.bool,
  btn: PropTypes.string,
  onAction: PropTypes.func
}

Card.defaultTypes = {
  id: 0,
  imgUrl: '',
  onLoseImg: () => {},
  name: '',
  caught: false,
  btn: '',
  onAction: () => {}
}

export default Card