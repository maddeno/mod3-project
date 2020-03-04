class MoviesController < ApplicationController
    
    def index
        movies = Movie.all
        render json: movies
    end

    def show
        movie = Movie.find_by(id: params[:id])
        render json: movie
<<<<<<< HEAD

=======
>>>>>>> 45219655644204bc3f67f1a34d6ef2a57e961cd7
    end

    def create
        movie = Movie.create(movie_params)
        render json: movie
    end


    private

    def movie_params
        params.require(:movie).permit(:title, :release, :director, :image_url, :genre, :description)
    end


end
