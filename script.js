const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const displayDiv = document.getElementById('display')
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

window.onload = (event) =>{
  searchInput.value = 25;
  getPokemon();
}

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await response.json();
    const typeClassName = data.types[0].type.name;
    // Set Pokemon info
    pokemonName.textContent = `${data.name}`;
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `${data.weight}kg`;
    height.textContent = `${data.height / 10}m`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name}"/>
    `;
    types.innerHTML = data.types
      .map((obj) => `<span class="${obj.type.name}">${obj.type.name}</span>`)
      .join(' ');
    displayDiv.style.backgroundImage = `var(--${typeClassName}-img)`;
    // Set Stats
    hp.textContent = `${data.stats[0].base_stat}`;
    attack.textContent = `${data.stats[1].base_stat}`;
    defense.textContent = `${data.stats[2].base_stat}`;
    specialAttack.textContent = `${data.stats[3].base_stat}`;
    specialDefense.textContent = `${data.stats[4].base_stat}`;
    speed.textContent = `${data.stats[5].base_stat}`;
  } catch (error) {
      resetDisplay();
      alert('Pokemon not found');
      console.log(`Pokemon not found: ${error}`);
  }
}

const resetDisplay = () => {
  const sprite = document.getElementById('sprite');

  if (sprite) sprite.remove();

  pokemonName.textContent = '';
  pokemonId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  types.innerHTML = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
}

searchBtn.addEventListener('click', getPokemon);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    getPokemon();
  }
})