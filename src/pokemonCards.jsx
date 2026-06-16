import React from "react";

const PokemonCards = ({ pokemonData }) => {
  const downloadCard = () => {
    const element = document.getElementById(`card-${pokemonData.id}`);

    import("html2canvas").then((html2canvas) => {
      html2canvas.default(element, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${pokemonData.name}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        //This is testing for the git second commit.
      });
    });
  };

  return (
    <li className="pokemon-card" id={`card-${pokemonData.id}`}>
      <figure>
        <img
          crossOrigin="anonymous"
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>

      <h1 className="pokemon-name">{pokemonData.name}</h1>

      <div className="pokemon-info pokemon-highlight">
        <p>{pokemonData.types.map((type) => type.type.name).join(", ")}</p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info"><p>Height {pokemonData.height}</p></div>
        <div className="pokemon-info"><p>Weight {pokemonData.weight}</p></div>
        <div className="pokemon-info"><p>Speed {pokemonData.stats[5].base_stat}</p></div>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>{pokemonData.base_experience}</p>
          <span>Experience</span>
        </div>

        <div className="pokemon-info">
          <p>{pokemonData.stats[1].base_stat}</p>
          <span>Attack</span>
        </div>

        <div className="pokemon-info">
          <p>{pokemonData.abilities[0].ability.name}</p>
          <span>Ability</span>
        </div>
      </div>

      <button className="download-btn" onClick={downloadCard}>
        ⬇ 
      </button>
    </li>
  );
};

export default PokemonCards;
