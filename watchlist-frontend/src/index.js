let addMovie = false;
let genreFilter = false;


const NavButtons = document.querySelector("#buttons-container")
fetchMovies()

toggleForm()
toggleGenreFilter()


function fetchMovies() {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movieData => movieData.forEach(movie => renderMovie(movie)))
}

function renderMovie(movie) {
    const movieCard = `<div class="card">
            <h2>${movie.title}</h2>
            <img src=${movie.image_url} height="240" width="175" />
            <h4>Directed By: ${movie.director}<br>Released: ${movie.release}</h4>
            <button id=${movie.id}>Add to Watchlist</button>
        </div>`
    const main = document.querySelector('main')
    main.innerHTML += movieCard
}

function toggleForm() {
    const addBtn = document.getElementById("addBtn");
    const movieForm = document.querySelector(".form-container");
    addBtn.addEventListener("click", () => {
      addMovie = !addMovie;
      if (addMovie) {
        movieForm.style.display = "block";
      } 
      else {
        movieForm.style.display = "none";
      }
    });
}

function toggleGenreFilter() {
    const genreBtn = document.getElementById("genreBtn");
    const dropdown = document.getElementById("genre-filter");
    genreBtn.addEventListener("click", () => {
      genreFilter = !genreFilter;
      if (genreFilter) {
        dropdown.style.display = "block";
      } 
      else {
        dropdown.style.display = "none";
      }
    });
}
   
