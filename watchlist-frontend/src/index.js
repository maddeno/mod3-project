let addMovie = false;
let genreFilter = false;


const NavButtons = document.querySelector("#buttons-container")
fetchMovies()
toggleForm()
toggleGenreFilter()
formListener()


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


function formListener() {
    const movieForm = document.getElementById('add-movie-form')
    movieForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        const formData = {
            title: e.target[0].value,
            release: e.target[1].value,
            director: e.target[2].value,
            image_url: e.target[3].value,
            genre: e.target[4].value,
            description: e.target[5].value
        }
        
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        fetch('http://localhost:3000/movies', reqObj)
        .then(resp => resp.json())
        .then(movie => renderMovie(movie))

        movieForm.reset()
    })
}


function toggleForm() {
    const addBtn = document.getElementById("addBtn");
    const formContainer = document.querySelector(".form-container");
    addBtn.addEventListener("click", () => {
      addMovie = !addMovie;
      if (addMovie) {
        formContainer.style.display = "block";
      } 
      else {
        formContainer.style.display = "none";
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
   
