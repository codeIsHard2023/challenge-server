//import de express
const express = require("express");

//création de l'application
const app = express();

const movies = require("./dataChallenge.json");

//réponse du server au client sur page Welcome (un handler)
const welcomePage = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
//Définition de la route GET pour la page Welcome avec la réponse de server dans la constante welcomePage
app.get("/", welcomePage);
//handler pour l'affichage de données en format json qui sont  stockées dans movies
const getMovies = (req, res) => {
  res.status(200).json(movies);
};
//Définition de la route GET pour la page api/movies avec la réponse de server dans la constante getMovies
app.get("/api/movies", getMovies);

//handler pour l'affichage d'un des objets de tableau mouvies en fonction de son id
const selectedMovie = (req, res) => {
  //ici on enregistre le id récupéré à partir de url
  let foundId = req.params.id;

  // ici on transforme foundId, qui est un type string, en Integer
  foundId = parseInt(foundId, 10);

  //ici on cherche un mouvie avec un id correspondant
  const foundMouvie = movies.find((mouvie) => mouvie.id === foundId);

  //ici on vérifie si un mouvie avec id demandé existe dans le tableau (foundMouvie sera d'un type undefinied si la recherche sur ligne 58 n'a rien donné)
  if (foundMouvie !== undefined) {
    return res.status(200).json(foundMouvie); //retourne un objet avec le id correspondant
  } else {
    return res.status(404).send("Not found"); //retourne "Not found" si id n'existe pas dans le tableau
  }
};

app.get("/api/movies/:id", selectedMovie);

module.exports = app;
