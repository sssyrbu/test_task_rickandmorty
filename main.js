"use strict";
const apiBaseLink = "https://rickandmortyapi.com/api/character";

async function fetchAllCharacters() {
    let allCharacters = [];
    let nextPage = apiBaseLink;

    while (nextPage) {
        const response = await fetch(nextPage);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        allCharacters = allCharacters.concat(data.results);
        nextPage = data.info.next;
    }

    return allCharacters;
}

fetchAllCharacters()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching characters:', error);
    });
