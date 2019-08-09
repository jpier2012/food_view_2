class Dish < ApplicationRecord
    has_one_attached :photo

    belongs_to :user
    belongs_to :restaurant
    accepts_nested_attributes_for :restaurant

    validates :name, presence: true
    validates :price, presence: true, numericality: true
    validates :taste, presence: true, inclusion: { in: [1, 2, 3, 4, 5] }
    validates :overall_value, presence: true, inclusion: { in: [1, 2, 3, 4, 5] }
    validates :dining_experience, presence: true, inclusion: { in: [1, 2, 3, 4, 5] }

    scope :order_by_restaurant, -> { includes(:restaurant).order("restaurants.name") }

    def restaurant_name
        self.restaurant.name
    end

    def user_email
        self.user.email
    end
end
