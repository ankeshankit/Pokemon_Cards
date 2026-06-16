import React, { useEffect, useState } from "react";
import "./index.css";
import PokemonCards from "./PokemonCards";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(20);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=1302";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        return await res.json();
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = () => setVisible((prev) => prev + 20);

  if (loading) return <h1>Loading…</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <section className="container">
      <header>
        <h1>Let’s See The Pokémon</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="cards">

        {/* 🔴 NO DATA MESSAGE (Correct Position) */}
        {searchData.length === 0 && (
          <h2 className="no-data">❌ Data is not match</h2>
        )}

        {/* Pokémon Cards */}
        {searchData.slice(0, visible).map((currPokemon) => (
          <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
        ))}
      </ul>

      {visible < searchData.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
     <footer>
       <p>@ Roy BTL ❤️ with Ankit Yadav. All rights reserved.
        
      </p>
     </footer>
    </section>
  );
};

export default Pokemon;
