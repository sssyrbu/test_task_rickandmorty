"use strict";
import { initializeDB, writeCharacterToDB, closeConnection } from './database.js';

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

(async () => {
    try {
        await initializeDB();
        const data = await fetchAllCharacters();
        for (let i = 0; i < data.length; i++) {
            await writeCharacterToDB(data[i]);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await closeConnection();
    }
})();