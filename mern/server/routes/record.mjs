import express from "express";
import db from "../db/conn.mjs";
const cookieParser = import('cookie-parser');

import { ObjectId } from "mongodb";

const router = express.Router();

// This route runs when a user tries to login
router.post("/login", async (req, res) => {

  // Access the "users" collection
  let collection = await db.collection("users");

  // Creates a query with the username and password passed through the body
  // NOTE: always use req.body when using POST, use req.params when using GET
  let query = {username: req.body.username, password: req.body.password};

  // Result is null if no user exists in the DB, if they do we send a 200 OK status
  let result = await collection.findOne(query);

  if (result === null) res.status(500).send("Invalid Username or Password.");
  else res.send(result).status(200);
});

// Used when a new user signs up
router.post("/signup", async (req, res) => {

  // Put the data in our newUser variable
  let newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    habit_list: []
  };

  // Connect to the "users" database
  let collection = await db.collection("users");

  // We only need to search for the username, every username must be unique
  let query = {username: newUser.username};
  let checkDB = await collection.findOne(query);

  // If we dont find another user with the same username entered, then we insert this user into the DB
  if(!checkDB)
  {    
    let result = await collection.insertOne(newUser);    
    res.send(result).status(200);
  }
  else
  {
    res.status(500).send(checkDB);
  }

});

// Gets the users habit array
router.post("/getHabits", async (req, res) => {

  // Access the "users" collection
  let collection = await db.collection("users");

  let query = {username: req.body.username};

  let result = await collection.findOne(query);


  if (result === null) res.status(500).send("Cant get user habits");
  else res.send(result.habit_list).status(200);
});

// Called when the user updates the name of a habit
router.post("/editHabit", async (req, res) => {
  // Access the "users" collection
  let collection = await db.collection("users");

  let query = {username: req.body.username};

  let result = await collection.findOne(query);

  result.habit_list[req.body.habitID].habit_name = req.body.name;

  collection.replaceOne(query,result);

  if (result === null) res.status(500).send("Cant find user.");
  else res.send(result.habit_list[req.body.habitID].habit_name).status(200);
});

// Called when the user wants to add a habit
router.post("/addHabit", async (req, res) => {
  // Access the "users" collection
  let collection = await db.collection("users");

  let query = {username: req.body.username};

  let result = await collection.findOne(query);

  // This section creates a new habit
  let weeks=[[]];
  let habit_name = req.body.name;
  let habit_type = req.body.type

  // TODO, put an if here to add functionality for non-boolean habits
  for (let i = 0; i < 7; i++) 
  {
    weeks[0][i] = {done:false};      
  }

  // Our new habit
  let habit ={habit_name,habit_type,weeks};

  // Pushes the new habit to the end of the habit list
  result.habit_list.push(habit);

  collection.replaceOne(query,result);

  if (result === null) res.status(500).send("Cant find user.");
  else res.send(result.habit_list).status(200);
});

// Called when the user changes a habit's status on a certain day
router.post("/trackHabit", async (req, res) => {
  // Access the "users" collection
  let collection = await db.collection("users");

  let query = {username: req.body.username};

  let result = await collection.findOne(query);

  let habitID = req.body.habitID;
  let week = req.body.week;
  let day = req.body.day;

  // Think of a better variable name
  let change = req.body.change; 

  result.habit_list[habitID].weeks[week][day].done = change;
 

  collection.replaceOne(query,result);

  if (result === null) res.status(500).send("Cant find user.");
  else res.send( result.habit_list[habitID].weeks[week][day].done).status(200);
});

// Called when a user deletes a habit
router.post("/deleteHabit", async (req, res) => {
  // Access the "users" collection
  let collection = await db.collection("users");

  let query = {username: req.body.username};

  let result = await collection.findOne(query);

  // Deletes the habit at habitID
  result.habit_list.splice(req.habitID,1);

  collection.replaceOne(query,result);

  if (result === null) res.status(500).send("Cant delete element.");
  else res.send(result.habit_list).status(200);
});


export default router;