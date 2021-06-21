import React, { Component } from "react";
import Link from "../components/link";

class Home extends Component {

  state = {
    search: "",
    favourites: [""],
    films: [],
  };
  
  async getFilms() {
    const res = await fetch("https://swapi.dev/api/films/");
    const films = await res.json();
    this.setState({films: films.results});
  }
  
  getFavourites() {
    this.setState({"favourites": JSON.parse(window.localStorage.getItem("favourites") || "[]")});
  }

  updateFavourites(favourite: string) {
    let newFavourites: string[];
    if (this.state.favourites.includes(favourite)) {
      newFavourites = this.state.favourites.filter(cFavourite => !cFavourite.includes(favourite));
    } else {
      newFavourites = [...this.state.favourites, favourite];
    }
    window.localStorage.setItem("favourites", JSON.stringify(newFavourites));
    this.setState({favourites: newFavourites});
  }

  componentDidMount() {
    this.getFilms();
    this.getFavourites();
  }


  render() {
    return (
      <div>
        <h1 className="heading">Star Wars Films</h1>
        <input className="search" type="text" id="search" name="search" placeholder="Search for a movie" onChange={a => this.setState({search: a.currentTarget.value})}></input>
        {this.state.films.length !== 0 && <div className="topBorder"></div>}
        <div className="list">
          {this.state.films.filter((film: any) => 
            film.title.toLowerCase().includes(this.state.search.toLowerCase())).map((film: any, i: number) =>
              this.state.favourites.includes(film.title) && <div className="listItem" key={`film${i}`}>
                <Link href={`film/${film.episode_id}`}>{film.title}</Link>
                <div className="favourite" onClick={() => this.updateFavourites(film.title)}>{this.state.favourites.includes(film.title) ? "🌟" : "✰"}</div>
              </div>
            )
          }
          {this.state.films.filter((film: any) => 
            film.title.toLowerCase().includes(this.state.search.toLowerCase())).map((film: any, i: number) =>
              !this.state.favourites.includes(film.title) && <div className="listItem" key={`film${i}`}>
                <Link href={`film/${film.episode_id}`}>{film.title}</Link>
                <div className="favourite" onClick={() => this.updateFavourites(film.title)}>{this.state.favourites.includes(film.title) ? "🌟" : "✰"}</div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Home;