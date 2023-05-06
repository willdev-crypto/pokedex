



const pokeApi = {}
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.photo = pokeDetail.pokemon.sprites.other.dream_world.front_default
    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemon) => { })
}
pokeApi.getPokemons = (offset = 0, limit = 20) => {

    const url = 'https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}'
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url).then((response) => response.json())))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsdetails) => {
            console.log(pokemonsdetails)
        })

}

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4'),
    fetch('https://pokeapi.co/api/v2/pokemon/5'),
    fetch('https://pokeapi.co/api/v2/pokemon/6')


]).then((results) => {
    console.log(results)
})