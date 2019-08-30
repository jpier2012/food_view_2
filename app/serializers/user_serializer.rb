class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_many :unique_restaurants
end
