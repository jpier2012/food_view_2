class AddCreatedByIdToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :created_by_id, :integer
  end
end
