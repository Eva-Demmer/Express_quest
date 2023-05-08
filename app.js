// Import express.
const express = require("express");

// Create an application by calling the express module.
const app = express();

// Allow Express to read JSON requests
app.use(express.json());

// Import dotenv.
require("dotenv").config();

// Create a constant to store the port number. 
const port = process.env.APP_PORT ?? 5000;

// ----------------------------------- Routes ------------------------------------ 
const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const { validateMovie, validateUser } = require("./validators.js");

app.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.post("/api/users", validateUser, usersHandlers.postUser);
app.put("/api/users/:id", validateUser, usersHandlers.updateUser);
// ------------------------------------------------------------------------------- 

// Allow Express to work by listening for incoming connections, using app.listen. 
// This can be written w/o if... else.
app.listen(port, (err) => {
  if (err) {
    console.error("Oops! Something went wrong.");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});