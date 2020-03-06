class WatchlistsController < ApplicationController
    def index
        watchlists = Watchlist.all 
        render json: watchlists
    end

    def create
        watchlist = Watchlist.create(movie_id: params[:movie_id], viewer_id: params[:viewer_id], watched: false)
        render json: watchlist
    end

    def show
        watchlist = Watchlist.find_by(id: params[:id])   
            render json: watchlist
    end    

    def destroy
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.destroy
        render json: watchlist
    end

    def update
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.update(:watched => true )
        render json: watchlist
    end
end
