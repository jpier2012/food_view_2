class UsersController < ApplicationController
    def show_filters
    end

    def edit_filters
        session[:filters] ||= {}
        session[:filters] = params[:filters].each do |attr, value|
            session[:filters][:"#{attr}"] = value unless value.nil?
        end
        redirect_to all_restaurants_path
    end

    def clear_filters
        session.delete(:filters)
        redirect_to all_restaurants_path
    end

    def index
        @users = User.all
    end

    def show
        @user = User.find_by_id(params[:id])
    end

end