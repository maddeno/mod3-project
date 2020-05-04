# README

## Watchlist

![](images/screenshot.png)

### Demo: https://drive.google.com/open?id=1XrUGi8iK5mYCCZZn5whQZC9wKfom2ntr

### Technologies: Ruby, Rails, SQL, ActiveRecord JavaScript, Fetch 

Watchlist was built as the mod-3 project for Flatiron School's software enginerring boot camp. It is a single-page JavaScript app with a Rails back-end meant for movie-lovers to browse films and track their viewing. Users can browse the films already in the database, filter by genre, add new films to the database, and add films to their individual watchlist.

The real challenge here was to show proficiency at conditional renering with vanilla JavaScript. Working with a single page required a three-dimensional understanding of user flow to accomodate a variety of possible conditions, and display the appropriate data. By the time this project was finished, I was excited to start learning React and to build more complex apps using components. 

The Rails back-end consists of an ActiveRecord relational database storing users, movies, and a join table: watchlists. A watchlist belongs to a particular user, and many movies can be added to a watchlist. 

When the page mounts, all of the movies in the database are rendered in a card which includes and image,the title, director, release date, and genre. Users can scroll through the cards to see the available movies, or use the navigation button at the top to filter them by genre. When a genre filter is selected, the page morphs to render only the movies where the genre attribut matches the filter. 

There is also a button at the top to add a movie to the database. Upon clicking the "Add Movie" button, a form renders with input fields for all the requisite movie attributes. Once submitted, a new movie card appears at the bottom of the page. 

All cards include an "Add to Watchlist" button. If clicked when no user is logged-in, the text in the button changes, prompting the user to log in. Once a user is logged in they can add movies to their watchlist, which appears just below the navbar. Next to each movie in the watchlist there are buttons mark the movie as "watched" or to delete it from the watchlist. 

To start, navigate to the back-end and run ```rails s```. In another terminal navigate to /src in the front-end and run ```open index.html```.


