const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
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

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function convertPokemonToDetails(pokemon){
    return `
    <div class="card_top">
    <a href="/index.html" class="GoBackButton">
        <img src="imagestest/pngtree-right-pointing-arrow-icon-design-image_1164189-removebg-preview.png">
    </a>
    <h1>Bulbasaur</h1>
    <div class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </div>
</div>
<div class="card_middle">
    <img src="${pokemon.photo}">
</div>

<div class="card_bottom">
    <div class="menu">
        <span class="menu_items">about</span>
        <span class="menu_items">base stats</span>
        <span class="menu_items">evolution</span>
        <span class="menu_items">moves</span>
    </div>
    <ul class="Stats">
        <li class="baseStats">hp</li>
            <span class="baseStatsValue">15</span>
        <li class="baseStats">attack</li>
            <span class="baseStatsValue">15</span>
        <li class="baseStats">defense</li>
            <span class="baseStatsValue">15</span>
        <li class="baseStats">special attack</li>
            <span class="baseStatsValue">15</span>
    </ul>
</div>
    `
}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})