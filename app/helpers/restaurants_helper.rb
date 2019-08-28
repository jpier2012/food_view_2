module RestaurantsHelper
    def set_restaurant
        @restaurant ||= Restaurant.find_by_id(params[:id])
    end

    def restaurant_access_redirect
        if @restaurant.created_by_id != current_user.id
            current_user.errors[:error] << ": You cannot edit a restaurant you did not create"
            render :index
        end
    end

    def user_created_restaurant
        @restaurant.created_by_id == current_user.id
    end
end
