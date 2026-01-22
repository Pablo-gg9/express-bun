import { getJSDocReadonlyTag } from "typescript";
import {Database} from "bun:sqlite"
import { initDB} from "./db/init";
import { getAllMovies,getMoviesById,getMoviesByTitle,getMoviesByGenre, getMoviesByTitleAndGenre} from "./models/movies";
import express from "express"
import type{Request,Response,NextFunction} from "express"


const db:Database= await initDB()
const m1= getMoviesByGenre(db, "action")
console.log(m1)