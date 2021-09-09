import React, { Component } from 'react'
import axios from 'axios'
import PokemonProfile from '../../components/PokemonProfile/PokemonProfile'

class Profile extends Component {
  state = {
    pokemon: {
      // name: "bulbasaur",
      // id: 1,
      // caught: true,
      // date_caught: 'Sep 09 2021 12:15:51'
    },
    // caught_date:{}
  }

  componentDidMount() {
    this.getPokemon();
  }
  
  async getPokemon() {
    const id = this.props.match.params.id
    try {
      const responce = await axios.get(`http://localhost:3000/pokemons/${id}`)
        if(responce.status === 200){
        this.setState({
          pokemon: responce.data
        })
        const imgUrl = process.env.PUBLIC_URL + `/img/${this.state.pokemon.id}.png`
        this.setState({
          imgUrl
        })
        
      }
    } catch (e) {
      this.props.history.push('/404')
    }
  }


  setImgUrl(){
    let noFoto = process.env.PUBLIC_URL + `/img/no-foto.png`
    this.setState({
      imgUrl: noFoto
    })
  }

  render() {
    return (
      <>
        <PokemonProfile
          name={this.state.pokemon.name}
          id={this.state.pokemon.id}
          imgUrl={this.state.imgUrl}
          caught={this.state.pokemon.caught}
          date_caught={this.state.pokemon.date_caught}
          onLoseImg={this.setImgUrl.bind(this)}
        />
      </>
    )
  }
}

export default Profile