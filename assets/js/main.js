const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToli(pokemon) {
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

function convertPokemonToDiv(pokemon) {
    return `
    <header class="header_detail">
    <div class="${pokemon.type}">
    <span id="pokemonName" class="header_detail_name">${pokemon.name}</span>
    <span id="pokemonNumber" class="header_detail_id">${pokemon.number}</span>
    </div>
    </header>
<main>
    <div class="apresentacao_pokemom" >
        <img class="apresentacao_pokemom_foto" src="${pokemon.photo}" alt="${pokemon.name}">
        <span class="apresentacao_pokemom_tipo">${pokemon.type}</span>
        <span class="apresentacao_pokemom_sobre" >About</span>
        <div class="apresentacao_pokemom_caracteristica_conteiner" >
            <div class="apresentacao_pokemom_caracteristica">
                <span class="apresentacao_pokemom_caracteristica_detalhe">${pokemon.weight} kg</span>
                <span class="apresentacao_pokemom_caracteristica_detalhe2">Weight</span>
            </div>
            <div class="apresentacao_pokemom_caracteristica">
                <span class="apresentacao_pokemom_caracteristica_detalhe">${pokemon.height} m</span>
                <span class="apresentacao_pokemom_caracteristica_detalhe2">Height</span>
            </div>
    </div>
</main>
    `;
}

function loadPokemonItens(offset,limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map(convertPokemonToli).join('')
        pokemonList.innerHTML += newHtml


    })
}

function loadPokemonDetail(id) {

    pokeApi.getPokemonDetailId(id).then((pokemon) => {
        const newWindow = window.open(`./detail.html?id=${id}`, "_blank");
        
        newWindow.onload = function() {
            const pokemonHtml = convertPokemonToDiv(pokemon);
            const pokemonDetailElement = newWindow.document.getElementById('pokemonDetail');
            
            if (pokemonDetailElement) {
                pokemonDetailElement.innerHTML = pokemonHtml;
            } else {
                console.error('Elemento pokemonDetail não encontrado na nova janela.');
            }
            newWindow.document.close();
        }
    });
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

function viewDetails(id) {

    const link = document.createElement("a");

    loadPokemonDetail(id)
}
