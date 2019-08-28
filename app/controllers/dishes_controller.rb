class DishesController < ApplicationController
    include DishesHelper
    include RestaurantsHelper
    before_action :set_dish, only: [:show, :edit, :update, :destroy]
    before_action :set_restaurant, only: [:show, :edit, :update]
    before_action :dish_access_redirect, only: [:edit, :update, :destroy]

    def index
        if params[:restaurant_id]
            @dishes = Restaurant.find_by_id(params[:restaurant_id]).dishes
        else
            @dishes = current_user.dishes.order_by_restaurant
        end
    end

    def all
        @dishes = Dish.order_by_restaurant
    end

    def new
        if params[:restaurant_id]
            @restaurant = Restaurant.find_by_id(params[:restaurant_id])
            @dish = @restaurant.dishes.build
        else
            @dish = Dish.new
            @restaurant = @dish.build_restaurant
        end
    end

    def create
        if !params[:dish][:restaurant_id].blank?
            @restaurant = Restaurant.find_by_id(params[:dish][:restaurant_id])
            @dish = @restaurant.dishes.build(dish_params)
            @dish.user = current_user
        else
            @dish = current_user.dishes.build(dish_params)
            @dish.restaurant.created_by_id = current_user.id
            @dish.restaurant.created_by_email = current_user.email
        end

        if @dish.valid?
            @dish.photo.attach(params[:photo]) if params[:photo]
            @dish.save
            redirect_to restaurant_dish_path(@dish.restaurant, @dish)
        else
            render :new
        end
    end

    def show
    end

    def edit
    end

    def update
        @dish.update(dish_params)

        if @dish.valid?
            redirect_to restaurant_dish_path(@dish)
        else
            render :edit
        end
    end

    def destroy
        @dish.destroy
        redirect_to restaurant_path(@dish.restaurant)
    end

    private

        def dish_params
            params.require(:dish).permit(
                :name, 
                :description, 
                :price, 
                :taste, 
                :overall_value, 
                :dining_experience, 
                :restaurant_id,
                :photo,
                restaurant_attributes: [
                    :name,
                    :description,
                    :cuisine,
                    :dress_code,
                    :byob,
                    :child_friendly,
                    :open_bar,
                    :outdoor_seating
                ]
            )
        end
end
