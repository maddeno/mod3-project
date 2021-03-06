class MoviesController < ApplicationController
    
    def index
        movies = Movie.all
        render json: movies
    end

    def show
        movie = Movie.find_by(id: params[:id])
        render json: movie
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
