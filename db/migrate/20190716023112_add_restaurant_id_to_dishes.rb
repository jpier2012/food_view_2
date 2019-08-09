class AddRestaurantIdToDishes < ActiveRecord::Migration[5.2]
  def change
    add_column :dishes, :restaurant_id, :integer
  end
end
