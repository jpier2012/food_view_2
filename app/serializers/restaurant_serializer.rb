class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :cuisine, :dress_code, :outdoor_seating, :child_friendly, :open_bar, :byob
end
