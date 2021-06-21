import React, { Component } from "react";
import Link from "../../components/link";
import ReactTooltip from "react-tooltip";

class Film extends Component {

  state: any = {
    filmId: 0,
    film: {},
    characters: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  };
  
  async getFilm() {
    this.setState({filmId: parseInt(window.location.pathname.split("/")[2])});
    const res = await fetch(`https://swapi.dev/api/films/`);
    const films = await res.json();
    const film = films.results.find((film: any) => film.episode_id === this.state.filmId);
    this.setState({film});
  }

  async getCharacters() {
    this.state.film.characters.forEach(async (url: string) => {
        const res = await fetch(url);
        const characters = await res.json();
        this.setState({characters: [...this.state.characters, characters]})
    });
}

  async getPlanets() {
      this.state.film.planets.forEach(async (url: string) => {
          const res = await fetch(url);
          const planet = await res.json();
          this.setState({planets: [...this.state.planets, planet]})
      });
  }
  
  async getSpecies() {
    this.state.film.species.forEach(async (url: string) => {
        const res = await fetch(url);
        const species = await res.json();
        this.setState({species: [...this.state.species, species]})
    });
}

async getStarships() {
    this.state.film.starships.forEach(async (url: string) => {
        const res = await fetch(url);
        const starships = await res.json();
        this.setState({starships: [...this.state.starships, starships]})
    });
}

async getVehicles() {
    this.state.film.vehicles.forEach(async (url: string) => {
        const res = await fetch(url);
        const vehicles = await res.json();
        this.setState({vehicles: [...this.state.vehicles, vehicles]})
    });
}

  async componentDidMount() {
    await this.getFilm();
    this.getCharacters();
    this.getPlanets();
    this.getSpecies();
    this.getStarships();
    this.getVehicles();
  }

  render() {
    const film: any = this.state.film;
    const characters: any =  this.state.characters;
    const planets: any =  this.state.planets;
    const species: any =  this.state.species;
    const starships: any =  this.state.starships;
    const vehicles: any =  this.state.vehicles;
    return (
      <div>
          <head><title>{film.title}</title></head>
          <Link href="/"><p className="sText">Go back</p></Link>
          <h1 className="heading">{film.title}</h1>
          <p className="sText"><b>Opening Crawl:</b> {film.opening_crawl}</p>
          <p className="sText"><b>Release Date:</b> {film.release_date}</p>
          <p className="sText"><b>Director:</b> {film.director}</p>
          <p className="sText"><b>Producer:</b> {film.producer}</p>
          <div className="list title">
              <p className="sText">Characters</p>
              {characters.length !== 0 && <div className="topBorder" />}
              {characters.map((character: any, i: number) => {
                  return <div className="listItem" data-tip={`
                      ${character.name}<br>
                      Birth Year: ${character.birth_year}<br>
                      Eye Colour: ${character.eye_color}<br>
                      Gender: ${character.gender}<br>
                      Hair Colour: ${character.hair_color}<br>
                      Height: ${character.height}<br>
                      Mass: ${character.mass}<br>
                      Skin Color: ${character.skin_color}<br>
                  `} key={`character${i}`}>{character.name}<ReactTooltip multiline/></div>
              })}
          </div>
          <div className="list title">
            <p className="sText">Planets</p>
            {planets.length !== 0 && <div className="topBorder" />}
            {planets.map((planet: any, i: number) => {
                return <div className="listItem" data-tip={`
                    ${planet.name}<br>
                    Diameter: ${planet.diameter}<br> 
                    Gravity: ${planet.gravity}<br> 
                    Orbital Period: ${planet.orbital_period}<br> 
                    Climate: ${planet.climate}<br> 
                    Population: ${planet.population}<br> 
                    Rotation Period: ${planet.rotation_period}<br> 
                    Surface Water: ${planet.surface_water}<br> 
                    Terrain: ${planet.terrain}
                `} key={`planet${i}`}>{planet.name}<ReactTooltip multiline /></div>
            })}
          </div>
          <div className="list title">
            <p className="sText">Species</p>
            {species.length !== 0 && <div className="topBorder" />}
            {species.map((specie: any, i: number) => {
                return <div className="listItem" data-tip={`
                    ${specie.name}<br>
                    Average Height: ${specie.average_height}<br> 
                    Average Lifespan: ${specie.average_lifespan}<br> 
                    Classification: ${specie.classification}<br> 
                    Designation: ${specie.designation}<br> 
                    Eye Colours: ${specie.eye_colors}<br> 
                    Hair Colours: ${specie.hair_colors}<br>
                    Language: ${specie.language}<br>
                    Skin Colours: ${specie.skin_colors}
                `} key={`species${i}`}>{specie.name}<ReactTooltip multiline/></div>
            })}
          </div>
          <div className="list title">
            <p className="sText">Starships</p>
            {starships.length !== 0 && <div className="topBorder" />}
            {starships.map((starship: any, i: number) => {
                return <div className="listItem" data-tip={`
                    ${starship.name}<br>
                    MGLT: ${starship.MGLT}<br>
                    Cargo Capacity: ${starship.cargo_capacity}<br>
                    Consumables: ${starship.consumables}<br>
                    Cost in Credits: ${starship.cost_in_credits}<br>
                    Crew: ${starship.crew}<br>
                    Hyperdrive Rating: ${starship.hyperdrive_rating}<br>
                    Length: ${starship.length}<br>
                    Manufacturer: ${starship.manufacturer}<br>
                    Max Atmosphering Speed: ${starship.max_atmosphering_speed}<br>
                    Model: ${starship.model}<br>
                    Passengers: ${starship.passengers}<br>
                    Starship Class: ${starship.starship_class}
                `} key={`starships${i}`}>{starship.name}<ReactTooltip multiline/></div>
            })}
          </div>
          <div className="list title">
            <p className="sText">Vehicles</p>
            {vehicles.length !== 0 && <div className="topBorder" />}
            {vehicles.map((vehicle: any, i: number) => {
                return <div className="listItem" data-tip={`
                    ${vehicle.name}<br>
                    Cargo Capacity: ${vehicle.cargo_capacity}<br>
                    Consumables: ${vehicle.consumables}<br>
                    Cost In Credits: ${vehicle.cost_in_credits}<br>
                    Crew: ${vehicle.crew}<br>
                    Length: ${vehicle.length}<br>
                    Manufacturer: ${vehicle.manufacturer}<br>
                    Max Atmosphering Speed: ${vehicle.max_atmosphering_speed}<br>
                    Model: ${vehicle.model}<br>
                    Passengers: ${vehicle.passengers}<br>
                    Vehicle Class: ${vehicle.vehicle_class}
                `} key={`vehicle${i}`}>{vehicle.name}<ReactTooltip multiline/></div>
            })}
          </div>
    </div>
    )
  }
}

export default Film;