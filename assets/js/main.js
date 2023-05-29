const listaPokemon = document.getElementById('pokemonList')
const loadListPokemon = document.getElementById('loadMoreButton')

const maxItens = 151
const limite = 10
let offset = 0;

function convertePokemonLista(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limite) {
    pokeApi.pegaPokemon(offset, limite).then((pokemons = []) => {
        const newHtml = pokemons.map(convertePokemonLista).join('')
        listaPokemon.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limite)

loadListPokemon.addEventListener('click', () => {
    offset += limite
    const qtdRecordsWithNexPage = offset + limite

    if (qtdRecordsWithNexPage >= maxItens) {
        const newLimit = maxItens - offset
        loadPokemonItens(offset, newLimit)

        loadListPokemon.parentElement.removeChild(loadListPokemon)
    } else {
        loadPokemonItens(offset, limite)
    }
})