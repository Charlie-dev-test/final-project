import React from "react";
import PropTypes from 'prop-types'
import classes from './PokemonProfile.module.css'

const PokemonProfile = props => {
  return (
    <div className="Main">
        <div className={classes.Wrap}>
        <img 
          className={classes.Pokemon} 
          onError ={ props.onLoseImg } 
          src={props.imgUrl} 
          alt={props.name}
        />
        <div className={classes.Description}>
          <h3>Имя: {props.name}</h3>
          <p>ID: <strong>{props.id}</strong></p>
          <p>Статус: <strong>{props.caught ? 'Пойман' : 'Не пойман'}</strong></p>
          {props.caught ? <p>Дата поимки: <strong>{props.date_caught}</strong></p> : ''}
        </div>
        </div>
      </div>
  )
}

PokemonProfile.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  caught: PropTypes.bool,
  date_caught: PropTypes.string,
  onLoseImg: PropTypes.func
}

PokemonProfile.defaultTypes ={
  imgUrl: '',
  name: '',
  id: 0,
  caught: false,
  date_caught: '',
  onLoseImg: () => {}
}

export default PokemonProfile