module DishesHelper
    def set_dish
        @dish ||= Dish.find_by_id(params[:id])
    end

    def dish_access_redirect
        if @dish.user != current_user
            current_user.errors[:error] << ": You cannot edit a dish you did not create"
            render :show
        end
    end

    def user_created_dish
        @dish.user == current_user
    end
end
