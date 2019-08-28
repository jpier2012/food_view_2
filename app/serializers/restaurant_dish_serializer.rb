class RestaurantDishSerializer < ActiveModel::Serializer
  attributes :name, :price, :user_id
end
