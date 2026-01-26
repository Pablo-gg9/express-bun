// fetch('/movies')
// .then(response => response.json())
// .then(data =>{
//     console.log(data);
// })

const respuesta = await fetch("/movies")
const movies = await respuesta.json()
console.log(movies)

const tableBody = document.querySelector("#tabla")

movies.forEach(movie => createMovie(movie))


function createMovie(movie){
     const tr = document.createElement("tr")
    const tdID = document.createElement("td")
    const tdTitulo = document.createElement("td")
    const tdGenero = document.createElement("td")

    tdID.textContent = movie.id
    tdTitulo.textContent = movie.nombre
    tdGenero.textContent = movie.genre.replaceAll("|",", ")
    tr.appendChild(tdID)
    tr.appendChild(tdTitulo)
    tr.appendChild(tdGenero)
    tableBody.appendChild(tr)
}