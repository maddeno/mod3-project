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

<<<<<<< HEAD
    def destroy
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.destroy
        render json: watchlist
    end
=======
    def update
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.update(:watched => true )
        render json: watchlist
    end

<<<<<<< HEAD
    def delete
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.destroy
    end
=======
    # private

    # def watchlist_params
    #     params.require(:watchlist).permit(:movie_id, :viewer_id, :watched)
    # end
>>>>>>> 94474ea5344520494d525011eb449d277505bac8
>>>>>>> 4afafe274c524e2d4b9cbecb0803c740fa5aef86

end
