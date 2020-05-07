# README

## Watchlist

![](images/screenshot.png)

### Demo: https://drive.google.com/open?id=1XrUGi8iK5mYCCZZn5whQZC9wKfom2ntr

### Features:
  - Create and Read functionality for Movies
  - Full CRUD functionality for Watchlists
  - Conditional Rendering
  - CSS Styling

### Technologies:
  - Ruby 2.6.1
  - Rails 6.0.2
  - sqlite3
  - ActiveRecord 
  - JavaScript
  - Fetch 

### Installing:
  - Clone this repo to your local machine ```git clone git@github.com:maddeno/mod3-project.git```
  - navigate to the back-end and run bundle install to install required dependencies
  - run rails db:create to create a database locally.
  - run rails db:migrate to create tables into the database.
  - run rails db:seed to create seed data.
  - start the back-end server run ```rails s```
  - navigate to the front end and start the server run ```open index.html```

Watchlist was built as the mod-3 project for Flatiron School's software enginerring boot camp. It is a single-page JavaScript app with a Rails back-end meant for movie-lovers to browse films and track their viewing. Users can browse the films already in the database, filter by genre, add new films to the database, and add films to their individual watchlist.

The real challenge here was to show proficiency at conditional rendering with vanilla JavaScript. Working with a single page required a three-dimensional understanding of user flow to accomodate a variety of possible conditions, and display the appropriate data. By the time this project was finished, I was excited to start learning React and to build more complex apps using components. 

The Rails back-end consists of an ActiveRecord relational database storing users, movies, and a join table: watchlists. A watchlist belongs to a particular user, and many movies can be added to a watchlist. 

When the page mounts, all of the movies in the database are rendered on a card which includes the title, director, release date, and genre as well as an image. Cards can be clicked; this toggles the display to show a description of the movie's plot.

Users can scroll through the cards to see the available movies, or use the navigation button at the top to filter them by genre. When a genre filter is selected, the page morphs to render only the movies where the genre attribut matches the filter. 

There is also a button at the top to add a movie to the database. Upon clicking the "Add Movie" button, a form renders with input fields for all the requisite movie attributes. Once submitted, a new movie card appears at the bottom of the page. 

All cards include an "Add to Watchlist" button. If clicked when no user is logged-in, the text in the button changes, prompting the user to log in. Once a user is logged in they can add movies to their watchlist, which appears just below the navbar. Next to each movie in the watchlist there are buttons mark the movie as "watched" or to delete it from the watchlist. 

To start, navigate to the back-end and run ```rails s```. In another terminal navigate to /src in the front-end and run ```open index.html```.


