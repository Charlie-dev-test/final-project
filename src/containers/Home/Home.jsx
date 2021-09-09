import React, { Component } from "react";
import Card from '../../components/Card/Card.jsx'
import ButtonMore from "../../components/ButtonMore/ButtonMore.jsx";
import axios from 'axios'

class Home extends Component {
  state = {
    pokemons: [],
    pagination: 10,
    list: 10
  }

  componentDidMount(){
    this.getAllPokemons()
  }

  async getAllPokemons() {
    try {
      const responce = await axios.get('http://localhost:3000/pokemons/')
        if(responce.status === 200){
        this.setState({
          pokemons: responce.data
        })
        let newPokemons = [];
        for(let i=0; i<this.state.pokemons.length; i++){
          let newPokemon = this.state.pokemons[i]
          newPokemon.imgUrl = process.env.PUBLIC_URL + `/img/${this.state.pokemons[i].id}.png`
          newPokemons.push(newPokemon)
        }
        this.setState({
          pokemons: newPokemons
        })        
      }
    } catch (e) {
      console.log(e)
      this.props.history.push('/404')
    }
  }


  catchPokemonHandler(index) {
    this.setPokemon(index)
  }

  async setPokemon(index) {
    let newPokemons = [...this.state.pokemons]
    newPokemons[index].caught = true
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    }
    newPokemons[index].date_caught = new Date().toLocaleString("ru", options)
    try {
      const responce = await axios.put(`http://localhost:3000/pokemons/${index + 1}`, newPokemons[index])
        if(responce.status === 200){
          this.setState({
            pokemons: newPokemons
          })
        }
      } catch (e) {
        this.props.history.push('/404')
      }
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

  render() {
    let pokemons = null
    if(this.state.pokemons){
      pokemons = this.state.pokemons.map((pokemon, index) => {
        const btn = pokemon.caught ? 'Пойман' : 'Поймать'
        if(index < this.state.list){
          return (
            <Card 
              key={index}
              name={pokemon.name}
              id={pokemon.id}
              imgUrl={pokemon.imgUrl}
              caught={pokemon.caught}
              btn={btn}
              onAction={this.catchPokemonHandler.bind(this, index)}
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


export default Home