fetchMovies()



function fetchMovies() {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movieData => movieData.forEach(movie => renderMovie(movie)))
}

function renderMovie(movie) {
    const movieCard = `<div class="card">
            <h2>${movie.title}</h2>
            <img src=${movie.image_url} height="240" width="180" />
            <h4>Directed By: ${movie.director}<br>Released: ${movie.release}</h4>
            <button id=${movie.id}>Add to Watchlist</button>
        </div>`
    const main = document.querySelector('main')
    main.innerHTML += movieCard
}
   
