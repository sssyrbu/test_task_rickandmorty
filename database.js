"use strict";
import { readFileSync } from "fs";
import pkg from 'pg';
const { Client } = pkg;

const config = {
    connectionString:
        "postgres://candidate:62I8anq3cFq5GYh2u4Lh@rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net:6432/db1",
    ssl: {
        rejectUnauthorized: true,
        ca: readFileSync("/home/romik/.postgresql/root.crt").toString(),
    },
};

const conn = new Client(config);

export async function initializeDB() {
    const initialQuery = `
        CREATE TABLE IF NOT EXISTS morty_and_rick (
            id SERIAL PRIMARY KEY,
            name TEXT,
            data JSONB
        );
    `;

    try {
        await conn.connect();
        await conn.query(initialQuery);
        console.log("Table created successfully");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

export async function writeCharacterToDB(character_object) {
    const insertDataQuery = `
        INSERT INTO morty_and_rick (name, data)
        VALUES ($1, $2);
    `;

    const name = character_object.name;
    const data = character_object;

    try {
        await conn.query(insertDataQuery, [name, JSON.stringify(data)]);
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
    }
}

export async function closeConnection() {
    await conn.end();
}