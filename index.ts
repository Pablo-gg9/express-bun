import { initDB} from "./db/init";
import { getAllMovies,getMoviesById,getMoviesByTitle } from "./models/movies";

const db = await initDB()
// const peliculas = getAllMovies(db)
// console.log(peliculas)
const pelicula= getMoviesById(db,35)
console.log(pelicula)
const nombres= getMoviesByTitle(db,"Spider-man")
console.log(nombres)