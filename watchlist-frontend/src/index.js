let addMovie = false;
let genreFilter = false;
let signInFormToggle = false;
const signInForm = document.querySelector('#sign-in-form');
const NavButtons = document.querySelector('#buttons-container');
const userContainerToggle = document.getElementsByClassName('user-info')[0];
const userContainer = document.getElementsByClassName('user-info')[0];

fetchMovies();
toggleForm();
toggleGenreFilter();
formListener();
genreFiltering();
toggleSignIn();
signInFetch();

watchList();

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

function formListener() {
  const movieForm = document.getElementById('add-movie-form');
  movieForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
      title: e.target[0].value,
      release: e.target[1].value,
      director: e.target[2].value,
      image_url: e.target[3].value,
      genre: e.target[4].value,
      description: e.target[5].value
    };

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData)
    };

    fetch('http://localhost:3000/movies', reqObj)
      .then(resp => resp.json())
      .then(movie => renderMovie(movie));

    movieForm.reset();
  });
}

function toggleForm() {
  const addBtn = document.getElementById('addBtn');
  const formContainer = document.querySelector('.form-container');
  addBtn.addEventListener('click', () => {
    addMovie = !addMovie;
    if (addMovie) {
      formContainer.style.display = 'block';
    } else {
      formContainer.style.display = 'none';
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
  const genreFilterBtn = document.querySelector('#genre-filter');
  const movieCards = document.querySelector('main').children;
  genreFilterBtn.addEventListener('change', function(e) {
    console.log('yes!');
    const selectedGenre = event.target.value;
    //debugger;

    for (i = 0; i < movieCards.length; i++) {
      movieCards[i].style.display = 'block';
    }
    for (i = 0; i < movieCards.length; i++) {
      if (selectedGenre === 'None') {
        movieCards[i].style.display = 'block';
      } else if (
        movieCards[i].children[8].innerHTML != `Genre: ${selectedGenre}`
      ) {
        movieCards[i].style.display = 'none';
      }
    }
  });
}
function toggleSignIn() {
  const signInBtn = document.querySelector('#signInBtn');

  signInBtn.addEventListener('click', function() {
    if (event.target.innerHTML === 'Sign In') {
      signInFormToggle = !signInFormToggle;
      if (signInFormToggle) {
        signInForm.style.display = 'block';
      } else {
        signInForm.style.display = 'none';
      }
    }
    if (event.target.innerHTML === 'Sign Out') {
      console.log('im out!');
      //debugger
      userContainerToggle.style.display = 'none';
      event.target.innerHTML = 'Sign In';
      userContainer.children[1].remove();
    }
  });
}

function signInFetch() {
  signInForm.addEventListener('submit', function() {
    event.preventDefault();

    userContainerToggle.style.display = 'block';
    let user = event.target.children[1].value;
    const signInBtn = document.querySelector('#signInBtn');

    const configObj = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ username: user })
    };

    fetch('http://localhost:3000/viewers', configObj)
      .then(resp => resp.json())
      .then(userData => {
        console.log(userData);
        renderUser(userData);
      });
    event.target.reset();
    signInForm.style.display = 'none';
    signInBtn.innerHTML = 'Sign Out';

    //debugger
  });
}
function renderUser(userData) {
  const userName = document.createElement('h2');
  userName.innerHTML = `Welcome ${userData.username}!`;
  userName.dataset.id = userData.id;
  userContainer.append(userName);

  console.log('she made it!');
}
function watchList() {
  const movieCards = document.querySelector('main');

  movieCards.addEventListener('click', function() {
    if (event.target.innerHTML == 'Add to Watchlist') {
      const movieID = event.target.parentElement.children[10].id;
      const userID = userContainer.children[1].dataset.id;
      event.target.innerHTML = "Added to Watchlist!"
     event.target.className ="added"
     event.target.disabled="disabled"
      const configObj = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          movie_id: `${movieID}`,
          viewer_id: `${userID}`,
          watched: false
        })
      };
      fetch('http://localhost:3000/watchlists', configObj)
        .then(resp => resp.json())
        .then(watchlistData => {
          //console.log(watchlistData);
          renderWishList(watchlistData);
        })
        .catch(function(error) {
          alert('Bad things! Ragnarők!');
          console.log(error.message);
        });
    }
  });
}
function renderWishList(watchlistData) {
  const movieID = watchlistData.movie_id;
  fetch(`http://localhost:3000/movies/${movieID}`)
    .then(resp => resp.json())
    .then(movieData => {
      console.log(movieData);
      const userCard = `<li id=${movieData.id}>${movieData.title}
  <input type="checkbox" value="true" id="watched"></li><br>`;

      userContainer.innerHTML += userCard;
    });
}


