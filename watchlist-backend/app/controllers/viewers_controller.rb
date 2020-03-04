class ViewersController < ApplicationController
    def index
        viewers = Viewer.all
        render json: viewers 
    end

    def show
        viewer = Viewer.find_or_create_by(username: params[:username])
        render json:viewer
    end

    def create
        viewer = Viewer.find_or_create_by(username: params[:username])
        
        render json: viewer
    end
end