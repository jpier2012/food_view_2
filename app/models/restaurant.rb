class Restaurant < ApplicationRecord
    has_many :dishes, dependent: :destroy
    has_many :users, through: :dishes
    validates :name, presence: true
    validates :cuisine, presence: true
    validates :byob, inclusion: { in: [true, false] }
    validates :outdoor_seating, inclusion: { in: [true, false] }
    validates :child_friendly, inclusion: { in: [true, false] }
    validates :open_bar, inclusion: { in: [true, false] }

    scope :american, -> { where(cuisine: "American")}
    scope :thai, -> { where(cuisine: "Thai")}
    scope :indian, -> { where(cuisine: "Indian")}
    scope :chinese, -> { where(cuisine: "Chinese")}
    scope :mexican, -> { where(cuisine: "Mexican")}
    scope :french, -> { where(cuisine: "French")}
    scope :bbq, -> { where(cuisine: "BBQ")}
    
    scope :byob, -> { where(byob: true) }
    scope :no_byob, -> { where(byob: false) }
    scope :child_friendly, -> { where(child_friendly: true) }
    scope :no_child_friendly, -> { where(child_friendly: false) }
    scope :open_bar, -> { where(open_bar: true) }
    scope :no_open_bar, -> { where(open_bar: false) }
    scope :outdoor_seating, -> { where(outdoor_seating: true) }
    scope :no_outdoor_seating, -> { where(outdoor_seating: false) }

    def self.cuisines
        self.pluck(:cuisine).uniq
    end

    def self.cuisine(cuisine)
        self.where(cuisine: cuisine)
    end
end
