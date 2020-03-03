let addMovie = false;
let genreFilter = false;

const NavButtons = document.querySelector('#buttons-container');
const genreFilterBtn = document.querySelector('#genre-filter');
const movieCards = document.querySelector('main').children;
fetchMovies();
toggleForm();
toggleGenreFilter();
genreFiltering();

function fetchMovies() {
  fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movieData => movieData.forEach(movie => renderMovie(movie)));
}

function renderMovie(movie) {
  const movieCard = `<div class="card" style="display: block">
            <h2>${movie.title}</h2>
            <img src=${movie.image_url} height="240" width="175" /><br><br>
            <li>Directed By: ${movie.director}</li>
            <br><li>Released: ${movie.release}</li>
            <br><li>Genre: ${movie.genre}</li><br>
            <button id=${movie.id}>Add to Watchlist</button>
        </div>`;
  const main = document.querySelector('main');
  main.innerHTML += movieCard;
}

function toggleForm() {
  const addBtn = document.getElementById('addBtn');
  const movieForm = document.querySelector('.form-container');
  addBtn.addEventListener('click', () => {
    addMovie = !addMovie;
    if (addMovie) {
      movieForm.style.display = 'block';
    } else {
      movieForm.style.display = 'none';
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
  genreFilterBtn.addEventListener('change', function(e) {
    console.log('yes!');
    const selectedGenre = event.target.value[0];
    //debugger;

    for (i = 0; i < movieCards.length; i++) {
      movieCards[i].style.display = 'block';
    }
    for (i = 0; i < movieCards.length; i++) {
      if (selectedGenre === 'N') {
        movieCards[i].style.display = 'block';
      } 
      else if (movieCards[i].children[8].innerHTML[7] != selectedGenre) {
        movieCards[i].style.display = 'none';
      }
    }

    // if (event.target.value === 'All') {
    //   for (i = 0; movieCards.length < i; i++) {
    //     movieCards[i].style.display = 'block';
    //   }
    //   if (event.target.value[0] === 'D') {
    //     for (i = 0; movieCards.length < i; i++) {
    //       movieCards[i].children[3].innerText[0] === 'D'
    //         ? (card.style.display = 'block')
    //         : (card.style.display = 'none');
    //     }
    //   }
    //}
  });
}
