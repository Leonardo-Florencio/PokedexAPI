const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        pokemonImage.style.display = 'block';
        const APIResponseConverted = await APIResponse.json()
        return APIResponseConverted;
    }
}
        

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const searchedPokemon = await fetchPokemon(pokemon);

    if(searchedPokemon) {
    pokemonName.innerHTML = searchedPokemon.name;
    pokemonNumber.innerHTML = searchedPokemon.id;
    pokemonImage.src = searchedPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''
    searchPokemon = searchedPokemon.id;
    } else {
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = ''
        pokemonImage.style.display = 'none';
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);

})

renderPokemon(searchPokemon);