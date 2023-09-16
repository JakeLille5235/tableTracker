import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "mongodb+srv://JakeLille:AdminAccess25565101@cluster0.gmbalhz.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Valid-Users");


export default db;