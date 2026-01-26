import { getJSDocReadonlyTag } from "typescript";
import {Database} from "bun:sqlite"
import { initDB} from "./db/init";
import { getAllMovies,getMoviesById,getMoviesByTitle,getMoviesByGenre, getMoviesByTitleAndGenre, insertMovie} from "./models/movies";
import express from "express"
import type{Request,Response,NextFunction} from "express"


const db:Database= await initDB()
insertMovie(db,"MOVIE BEE","Zbb,Zbb")
const movies=getAllMovies(db)
console.log(movies)