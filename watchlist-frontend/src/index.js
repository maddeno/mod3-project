let addMovie = false;
let genreFilter = false;


const NavButtons = document.querySelector("#buttons-container")

fetchMovies()
toggleForm()
toggleGenreFilter()
formListener()
genreFiltering()
toggleDescription()


function fetchMovies() {
  fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movieData => movieData.forEach(movie => renderMovie(movie)));
}


function renderMovie(movie) {

    const movieCard = `<div data-id=${movie.id} class="card" style="display: block">
        <h2>${movie.title}</h2>
        <img style="display: inline-block" src=${movie.image_url} class="movie-image" height="240" width="175" />
        <p style="display: none" class="card-description">${movie.description}</p>
        <li>Directed By: ${movie.director}</li>
        <br><li>Released: ${movie.release}</li>
        <br><li>Genre: ${movie.genre}</li><br>
        <button id=${movie.id}>Add to Watchlist</button>
    </div>`

    const main = document.querySelector('main');
    main.innerHTML += movieCard;
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



function toggleDescription() {
    const main = document.querySelector('main');
    main.addEventListener('click', function(e) {
        if(e.target.className === "movie-image") {
            e.target.style.display="none";
            e.target.nextElementSibling.style.display="block";
        }

        if(e.target.className === "card-description") {
            e.target.style.display="none";
            e.target.previousElementSibling.style.display="inline-block";
        }
    });
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
  const genreBtn = document.getElementById('genreBtn');
  const dropdown = document.getElementById('genre-filter');
  genreBtn.addEventListener('click', () => {
    genreFilter = !genreFilter;
    if (genreFilter) {
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  });
}


function genreFiltering() {
  const genreFilterBtn = document.querySelector("#genre-filter")
  const movieCards = document.querySelector("main").children

  genreFilterBtn.addEventListener('change', function(e) {
    const selectedGenre = event.target.value;

    for (i = 0; i < movieCards.length; i++) {
      movieCards[i].style.display = 'block';
    }
    for (i = 0; i < movieCards.length; i++) {
      if (selectedGenre === 'None') {
        movieCards[i].style.display = 'block';
      } 
      else if (movieCards[i].children[8].innerHTML != `Genre: ${selectedGenre}`) {
        movieCards[i].style.display = 'none';
      }
    }

  });
}
