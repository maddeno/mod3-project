let addMovie = false;
let genreFilter = false;
let signInFormToggle = false;
let currentUser = null;
const signInForm = document.querySelector('#sign-in-form');
const NavButtons = document.querySelector('#buttons-container');
const userContainer = document.getElementsByClassName('flex-container')[0];

fetchMovies();
toggleForm();
toggleGenreFilter();
formListener();
genreFiltering();
toggleDescription();
toggleSignIn();
signInFetch();
markAsWatched();


function fetchMovies() {
  fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(movieData => movieData.forEach(movie => renderMovie(movie)));
}


function renderMovie(movie) {
  const movieCard = `<div data-genre=${movie.genre} data-id=${movie.id} class="card" style="display: block">
        <h2>${movie.title}</h2>
        <img style="display: inline-block" src=${movie.image_url} class="movie-image" height="240" width="175" />
        <p style="display: none" class="card-description">${movie.description}</p>
        <li>Directed By: ${movie.director}</li>
        <br><li>Released: ${movie.release}</li>
        <br><li id="card-genre">Genre: ${movie.genre}</li><br>
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


function toggleDescription() {
  const main = document.querySelector('main');
  main.addEventListener('click', function(e) {
    if (e.target.className === 'movie-image') {
      e.target.style.display = 'none';
      e.target.nextElementSibling.style.display = 'block';
    }

    if (e.target.className === 'card-description') {
      e.target.style.display = 'none';
      e.target.previousElementSibling.style.display = 'inline-block';
    }
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
    const selectedGenre = e.target.value;
    
    for (i = 0; i < movieCards.length; i++) {
        movieCards[i].style.display = 'block';

    }

    if(selectedGenre != 'None') {
        for(i=0; i < movieCards.length; i++) {
            if(movieCards[i].dataset.genre != selectedGenre) {
                movieCards[i].style.display = 'none';
            }
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
        userContainer.children[0].innerHTML = ''
        userContainer.style = 'display: none';
        event.target.innerHTML = 'Sign In';
        currentUser = null
        reEnableButtons()
    }
  });
}


function reEnableButtons(){
    const movieCards = document.querySelector('main').children;
    
    for (i = 0; i < movieCards.length; i++) {
        const button = movieCards[i].children[9]
        button.className = ''
        button.innerHTML = 'Add to Watchlist'
        button.disabled = false
    }
}


function signInFetch() {
  signInForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const configObj = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username: e.target[0].value })
    };
    
    fetch('http://localhost:3000/viewers', configObj)
    .then(resp => resp.json())
    .then(viewerData => {
      currentUser = viewerData;
      renderUser(viewerData);  
    }); 

    signInFormToggle = false
    userContainer.style = 'display: block';
    event.target.reset();
    signInForm.style.display = 'none';
    const signInBtn = document.querySelector('#signInBtn');
    signInBtn.innerHTML = 'Sign Out';
  });
}


function renderUser(viewerData) { 
    const watchUl = document.getElementById("user-details")
    const userName = document.createElement('h3');
    userName.innerHTML = `Welcome ${viewerData.username}, to your Watchlist!`;
    userName.dataset.id = viewerData.id;
    userName.dataset.name = viewerData.username;
    watchUl.append(userName);
    for(let i = 0; viewerData.watchlists.length > i ; i++){
      const watchListLi = `<li id=${viewerData.watchlists[i].movie.id}>${viewerData.watchlists[i].movie.title} <button id="watched" class="user-buttons"> Mark as Watched </button>  <button id="remove" class="user-buttons"> Remove from Watchlist </button></li><br>`
      watchUl.innerHTML += watchListLi
      // debugger
    disableListedMovieButtons(viewerData.watchlists[i].movie.id)
  }
  watchList(userName)
  listenToUserDetails()
}


function disableListedMovieButtons(movie_id){
    const movieCards = document.querySelector('main').children;
    
    for (i = 0; i < movieCards.length; i++) {
        const button = movieCards[i].children[9]
        if(movieCards[i].dataset.id == movie_id) {
            button.className = 'added'
            button.innerHTML = 'In Your Watchlist'
            button.disabled = 'disabled'
        }
    }
}



function  watchList(userName) {

    const movieCards = document.querySelector('main');
    movieCards.addEventListener('click', function() {
        const movieID = event.target.parentElement.dataset.id;
        const userID = userName.dataset.id;
            if(event.target.innerHTML == 'Add to Watchlist') {

                if(!currentUser) {
                    event.target.innerText = 'Please Sign In'
                } else {
                    event.target.innerHTML = 'In your Watchlist';
                    event.target.className = 'added';
                    event.target.disabled = 'disabled'
                    
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
                        renderWatchList(watchlistData);
                    })
                    .catch(function(error) {
                        alert('Bad things! Ragnarők!');
                        console.log(error.message);
                    });
                }

            }
        
    })
}


function renderWatchList(watchlistData) {
  const movieID = watchlistData.movie_id;
  const viewerID = watchlistData.viewer_id
fetch(`http://localhost:3000/viewers/${viewerID}`)
.then(resp => resp.json())
.then(viewerData => {console.log("viewer-data",viewerData)
})

  fetch(`http://localhost:3000/movies/${movieID}`)
    .then(resp => resp.json())
    .then(movieData => {
      console.log("movie-data", movieData);
      const ul = document.getElementById("user-details")
      const userCard = `<li id=${movieData.id}>${movieData.title} <button id="watched" class="user-buttons"> Mark as Watched </button>  <button id="remove" class="user-buttons"> Remove from Watchlist </button></li><br>`

      ul.innerHTML += userCard;
    });
}

function listenToUserDetails() {
    const userDiv = document.getElementsByClassName('flex-container')
    userDiv.addEventListener('click', function(e) {
        if(e.target.id === 'watched') {
            markAsWatched(e)
        } else if(e.target.id === 'remove') {
            removeMovieFromWatchlist(e)
        }
    })
}



function removeMovieFromWatchlist() {

}



function markAsWatched() {
   if(currentUser) {
       debugger
        const userDiv = document.getElementsByClassName('flex-container')
        userDiv.addEventListener('click', function(e) {
            if(e.target.id === 'watched') {
                const movie = e.parentElement.id

                reqObj = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(movie)
                }

            }
        })
   }
}
