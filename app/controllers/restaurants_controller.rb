class RestaurantsController < ApplicationController
    include RestaurantsHelper
    before_action :set_restaurant, only: [:show, :edit, :update, :destroy, :js_restaurant_demo_show]
    before_action :restaurant_access_redirect, only: [:edit, :update, :destroy]

    def index
        @restaurants = current_user.restaurants.uniq
        respond_to do |format|
            format.html { render :index }
            format.json { render json: @restaurants }
        end
    end

    # if there are attributes present in the restaurant_filters session hash, 
    # this method will call the equivalent scope methods on the Restaurant class to chain the query criteria
    def all
        @restaurants = Restaurant.all
        render json: @restaurants
    end

    def new
        @restaurant = Restaurant.new
    end

    def create
        @restaurant = Restaurant.new(restaurant_params)
        @restaurant.created_by = current_user.id

        if @restaurant.valid?
            @restaurant.save
            redirect_to restaurant_path(@restaurant)
        else
            render :new
        end
    end

    def show
        respond_to do |format|
            format.html { render :show }
            format.json { render json: @restaurant }
        end
    end

    def edit
    end

    def update
        @restaurant.update(restaurant_params)

        if @restaurant.valid?
            redirect_to restaurant_path(@restaurant)
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