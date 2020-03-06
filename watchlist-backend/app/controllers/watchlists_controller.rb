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
        watchlist = Watchlist.where(viewer_id: params[:id])
        
        # options = {
        #     include: [:movie,:viewer]}
            render json: WatchlistSerializer.new(watchlist).to_serialized_json
            # watchlist, :include=>{:movie =>{:only =>[:title]},:viewer =>{:only=>[:username]}}
    end    

    def update
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.update(:watched => true )
        render json: watchlist
    end

    def delete
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.destroy
    end

end
