import { getJSDocReadonlyTag } from "typescript";
import { initDB} from "./db/init";
import { getMovies, insertMovie } from "./models/movies";
import express from "express"
import type{Request,Response,NextFunction} from "express"
import {redis} from "bun"

const app =express();
const PORT= 3000
const db = await initDB()
//sin esto no puedo acceder a req.body
app.use(express.json())
const logMiddleware = (req: Request,res:Response,next:NextFunction) => {
    //Kofigo
    console.log(req.method, req.url,new Date().toISOString)
    if(req.method==="GET"){
        console.log(req.query)
    }
    if(req.method ==="POST"){
      console.log(req.body)
    }
    next()
}
app.use(express.static("public"))
app.use(logMiddleware)
app.get("/movies",async(req:Request,res:Response)=>{
  const cached = await redis.get("movies_cache")
  if(cached){
    console.log("Respuesta cacheada puede tener los datos desactualizados")
    return res.json(JSON.parse(cached))
  }
  console.log("Refrescando cache")
  const {title,genres} =req.query
  const filters={
    title:typeof title=== "string" ? title:undefined,
    genres:typeof genres=== "string" ? genres:undefined
  }
  
  const movies=getMovies(db,filters)
  await redis.set("movies_cache",JSON.stringify(movies),"EX",50)
  res.json(movies)
    
})
app.post("/movies", (req,res)=>{
  //TODO Validar datos de entrada, si no llegan title y genre revienta
  // Todo usar un try/catch en caso de que la db falle
const {nombre,genre} =req.body
const respuesta = insertMovie(db,nombre,genre)

  res.json(respuesta)
})
app.listen(PORT,()=>{
    console.log("Servidor funcionando en puerto "+PORT)
})

// const peliculas = getAllMovies(db)
// console.log(peliculas)
