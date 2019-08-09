class CreateDishes < ActiveRecord::Migration[5.2]
  def change
    create_table :dishes do |t|
      t.string :name
      t.string :description
      t.float :price
      t.integer :taste, default: 3
      t.integer :overall_value, default: 3
      t.integer :dining_experience, default: 3

      t.timestamps
    end
  end
end
