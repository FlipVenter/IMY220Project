import { server } from './server.js';

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://u23692619:Jaco%26u%24%401@flip.rt4rm.mongodb.net/?retryWrites=true&w=majority&appName=Flip";
const client = new MongoClient(uri);

import "regenerator-runtime/runtime";

async function runFindQuery(collection, query, options) {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('IMYProject');
        const col = database.collection(collection);

        console.log(`Querying collection: ${collection} with query:`, query);
        const cursor = col.find(query, options);
        const results = await cursor.toArray();

        console.log(`Found ${results.length} documents`);
        return results;
    } catch (error) {
        console.error("Error during query execution:", error);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

(async () => {
    try {
        let results = await runFindQuery("songs", {});
        console.log("Query results:", results);
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
})();