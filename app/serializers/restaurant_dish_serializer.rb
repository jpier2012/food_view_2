class RestaurantDishSerializer < ActiveModel::Serializer
  attributes :name, :price, :photo
end
