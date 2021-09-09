import React, { Component } from 'react'
import Card from '../../components/Card/Card.jsx'
import ButtonMore from '../../components/ButtonMore/ButtonMore.jsx'
import axios from 'axios'

class Caught extends Component {
  state = {
    pokemons: [],
    pagination: 5,
    list: 5
  }

  componentDidMount(){
    this.getCaughtPokemons()
  }

  releasePokemonHandler(index) {
    this.updatePokemon(index)
  }

  getMoreHandler(){
    if(this.state.pagination <= this.state.pokemons.length){
      const newList = this.state.pagination + this.state.list;
      this.setState({
        list: newList
      })
    }
  }

  setImgUrl(index){
    const noFoto = process.env.PUBLIC_URL + `/img/no-foto.png`
    let newPokemons = [...this.state.pokemons]
    newPokemons[index].imgUrl = noFoto;
    this.setState({
      pokemons: newPokemons
    })
  }

  async getCaughtPokemons() {
    try {
      const responce = await axios.get('http://localhost:3000/pokemons/')
        if(responce.status === 200){
          let newPokemons = responce.data.filter((pokemon, index) => {
            pokemon.number = index
            return pokemon.hasOwnProperty('caught')
          })
          this.setState({
            pokemons: newPokemons
          })      
      }
    } catch (e) {
      console.log(e)
    }
  }

  async updatePokemon(index) {
    let newPokemons = [...this.state.pokemons]
    let number = newPokemons[index].number + 1
    delete newPokemons[index].number
    delete newPokemons[index].imgUrl
    delete newPokemons[index].caught
    delete newPokemons[index].date_caught
    try {
      const responce = await axios.put(`http://localhost:3000/pokemons/${number}`, newPokemons[index])
        if(responce.status === 200){
        this.getCaughtPokemons()  
      }
    } catch (e) {
      console.log(e)
      this.props.history.push('/404')
    }
  }

  render() {

    let pokemons = null
    if(this.state.pokemons){
      pokemons = this.state.pokemons.map((pokemon, index) => {
        const btn = 'Отпустить'
        if(index < this.state.list){
          return (
            <Card 
              key={index}
              name={pokemon.name}
              id={pokemon.id}
              imgUrl={pokemon.imgUrl}
              caught={!pokemon.caught}
              btn={btn}
              onAction={this.releasePokemonHandler.bind(this, index)}
              onLoseImg={this.setImgUrl.bind(this, index)}
            />
          )
        } else return false
        
      })
    }

    return (
      <div className="Main">
        <div className="Wrap">
          {pokemons}
        </div>
        <ButtonMore
          onMorePokemons={this.getMoreHandler.bind(this)}
        />
      </div>
    )
  }
}

export default Caught