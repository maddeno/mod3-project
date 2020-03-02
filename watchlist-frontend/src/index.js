let addMovie = false;


const NavButtons = document.querySelector("#buttons-container")
fetchMovies()
toggleForm()

function genreFilter(){
  NavButtons.addEventListener("click", function (event){
       if(event.target.innerHTML === "Browse by Genre"){
      console.log("yes!")
      
  }
  })    
}

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
      } else {
        movieForm.style.display = "none";
      }
    });
  }
   
