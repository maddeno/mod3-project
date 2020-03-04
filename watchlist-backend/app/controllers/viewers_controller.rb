class ViewersController < ApplicationController
    def index
        viewers = Viewer.all
        render json: viewers ,except: [:updated_at, :created_at]
    end

    def show
        viewer = Viewer.find_or_create_by(username: params[:username])
    
        
        render json:viewer ,  :include => {:watchlists =>{:only =>[:movie_id, :viewer_id, :watched]}}
    end

    def create
        viewer = Viewer.find_or_create_by(username: params[:username])
        render json: viewer
    end
end
