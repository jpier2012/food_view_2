class RestaurantsController < ApplicationController
    include RestaurantsHelper
    before_action :set_restaurant, only: [:edit, :update, :destroy]
    before_action :restaurant_access_redirect, only: [:edit, :update, :destroy]

    def index
        restaurants = Restaurant.all.order(:name)
        respond_to do |format|
            format.html { render :index }
            format.json { render json: restaurants }
        end
    end

    def create
        @restaurant = Restaurant.new(restaurant_params)
        @restaurant.created_by_id = current_user.id
        @restaurant.created_by_email = current_user.email

        if @restaurant.valid?
            @restaurant.save
            redirect_to restaurant_path(@restaurant)
        else
            render :new
        end
    end

    def show
        restaurant = Restaurant.find_by_id(params[:id])
        render json: restaurant
    end

    def edit
    end

    def update
        @restaurant.update(restaurant_params)

        if @restaurant.valid?
            redirect_to restaurants_path
        else
            render :edit
        end
    end

    def destroy
        @restaurant.destroy
        redirect_to restaurants_path
    end

    private

        def restaurant_params
            params.require(:restaurant).permit(:name, :address, :cuisine, :dress_code, :outdoor_seating, :child_friendly, :open_bar, :byob)
        end
end