
const pokeApi = {}

function PokeApiDetalhePokemon(pokemonDetalhe) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetalhe.id
    pokemon.name = pokemonDetalhe.name

    const tipos = pokemonDetalhe.types.map((typeSlot) => typeSlot.type.name)
    const [tipo] = tipos

    pokemon.types = tipos
    pokemon.type = tipo

    pokemon.photo = pokemonDetalhe.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.pegaDetalhesPokemon = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(PokeApiDetalhePokemon)
}

pokeApi.pegaPokemon = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.pegaDetalhesPokemon))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
