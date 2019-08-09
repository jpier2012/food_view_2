class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :cuisine
      t.string :dress_code
      t.boolean :outdoor_seating, default: false
      t.boolean :child_friendly, default: false
      t.boolean :open_bar, default: false
      t.boolean :byob, default: false

      t.timestamps
    end
  end
end
