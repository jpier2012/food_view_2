class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_many :dishes
  has_many :restaurants
end
