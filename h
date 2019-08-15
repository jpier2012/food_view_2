
[1mFrom:[0m /home/james/code/food_view_2/app/controllers/dishes_controller.rb @ line 42 DishesController#create:

    [1;34m30[0m: [32mdef[0m [1;34mcreate[0m
    [1;34m31[0m:     [32mif[0m !params[[33m:dish[0m][[33m:restaurant_id[0m].blank?
    [1;34m32[0m:         @restaurant = [1;34;4mRestaurant[0m.find_by_id(params[[33m:dish[0m][[33m:restaurant_id[0m])
    [1;34m33[0m:         @dish = @restaurant.dishes.build(dish_params)
    [1;34m34[0m:         @dish.user = current_user
    [1;34m35[0m:     [32melse[0m
    [1;34m36[0m:         @dish = current_user.dishes.build(dish_params)
    [1;34m37[0m:         @dish.restaurant.created_by = current_user.id
    [1;34m38[0m:     [32mend[0m
    [1;34m39[0m: 
    [1;34m40[0m:     [32mif[0m @dish.valid?
    [1;34m41[0m:         @dish.photo.attach(params[[33m:photo[0m]) [32mif[0m params[[33m:photo[0m]
 => [1;34m42[0m:         binding.pry
    [1;34m43[0m:         @dish.save
    [1;34m44[0m:         redirect_to restaurant_dish_path(@dish.restaurant, @dish)
    [1;34m45[0m:     [32melse[0m
    [1;34m46[0m:         render [33m:new[0m
    [1;34m47[0m:     [32mend[0m
    [1;34m48[0m: [32mend[0m

