import {Database} from "bun:sqlite"

export function getMovies(db:Database,filters:{title:string |undefined,genres:string|undefined}){
    const{title,genres}= filters;
    let movies 
    if(title && genres) movies=getMoviesByTitleAndGenre(db,title,genres)
    else if(title) movies = getMoviesByTitle(db,title)
    else if(genres) movies = getMoviesByGenre(db,genres)
    else movies= getAllMovies(db)

    return movies
        
    
}

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

export function getMoviesByGenre(db: Database, genero: string) {
    const query = db.query(
        "SELECT * FROM movies WHERE genre LIKE ?"
    )
    return query.all(`%${genero}%`)
}

export function getMoviesByTitleAndGenre(db: Database,title: string,genero: string) {
    const query = db.query(
        "SELECT * FROM movies WHERE nombre LIKE ? AND genre LIKE ?"
    )
    return query.all(`%${title}%`, `%${genero}%`)
}

export function insertMovie(db:Database, nombre:string, genre:string){
    const query =db.query("INSERT INTO movies (nombre,genre) VALUES (?,?) ")
    return query.run(nombre,genre)
}