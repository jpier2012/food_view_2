class UsersController < ApplicationController
    def show
        @user = User.find_by_id(params[:id])
        respond_to do |format|
            format.html { render :show }
            format.json { render json: @user }
        end
    end
end