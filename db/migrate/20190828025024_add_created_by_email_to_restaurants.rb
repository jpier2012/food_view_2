class AddCreatedByEmailToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :created_by_email, :string
  end
end
