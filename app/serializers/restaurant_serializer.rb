class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, 
             :name, 
             :address, 
             :cuisine, 
             :dress_code, 
             :outdoor_seating, 
             :child_friendly, 
             :open_bar, 
             :byob, 
             :created_by_id,
             :created_by_email
  has_many :dishes
end
