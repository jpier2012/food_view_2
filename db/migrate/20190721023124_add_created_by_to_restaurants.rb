class AddCreatedByToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :created_by, :integer
  end
end
