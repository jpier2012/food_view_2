class DishSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :taste, :dining_experience, :overall_value, :user_id, :restaurant_id
  belongs_to :restaurant, serializer: RestaurantDishSerializer
end
