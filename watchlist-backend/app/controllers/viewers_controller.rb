class ViewersController < ApplicationController
    def index
        viewers = Viewer.all
        render json: viewers 
    end

    def show
        viewer = Viewer.find_or_create_by(username: params[:username])
<<<<<<< HEAD
        render json:viewer
    end

    def create
        viewer = Viewer.find_or_create_by(username: params[:username]) 
=======
        render json: viewer
    end

    def create
        viewer = Viewer.find_or_create_by(username: params[:username])
>>>>>>> 943f57507bc935663612e1b656d320e4932e3b7b
        render json: viewer
    end
end