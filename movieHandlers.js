const database = require("./database");

// shows all movies in the database + filters by color and duration
const getMovies = (req, res) => {
  
  // declares variables to store the SQL string and the array with the SQL values
  const initialSql = "SELECT * FROM movies";
  const where = [];

  // if req.query.color is defined, sql will be "select * from movies where color = ?" and sqlValues will contain the color parameter
  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }

  // filters by duration
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "WHERE" : "AND"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// displays a movie from the database based on its ID
const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("SELECT * FROM movies WHERE id = ?", [id])
      .then(([movies]) => {
        if (movies[0] != null) {
          res.json(movies[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
};

// inserts a new movie into the database
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

// updates a specific movie depending on its ID
const putMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

// deletes a specific movie depending on its ID
const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM movies WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  putMovie,
  deleteMovie,
};