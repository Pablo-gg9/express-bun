import {Database} from "bun:sqlite"

export function getAllMovies(db:Database){
    const query=db.query("SELECT * FROM movies")
    return query.all()
}

export function getMoviesById(db:Database,id:number){
     const query=db.query("SELECT * FROM movies Where id= ?")
    return query.get(id)
}

export function getMoviesByTitle(db:Database,title:string){
     const query=db.query("SELECT * FROM movies Where nombre LIKE ? ")
    return query.all(`%${title}%`)
}