import { getJSDocReadonlyTag } from "typescript";
import { initDB} from "./db/init";
import { getMovies } from "./models/movies";
import express from "express"
import type{Request,Response,NextFunction} from "express"

const app =express();
const PORT= 3000
const db = await initDB()
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
app.get("/movies",(req:Request,res:Response)=>{
  const {title,genres} =req.query
  const filters={
    title:typeof title=== "string" ? title:undefined,
    genres:typeof genres=== "string" ? genres:undefined
  }
  const movies=getMovies(db,filters)
  res.json(movies)
    
})
app.post("/movies", (req,res)=>{

  res.send("pelicula insertada")
})
app.listen(PORT,()=>{
    console.log("Servidor funcionando en puerto "+PORT)
})

// const peliculas = getAllMovies(db)
// console.log(peliculas)
