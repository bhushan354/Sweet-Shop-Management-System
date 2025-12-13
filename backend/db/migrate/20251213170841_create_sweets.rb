class CreateSweets < ActiveRecord::Migration[8.1]
  def change
    create_table :sweets do |t|
      t.string  :name, null: false
      t.string  :category, null: false
      t.decimal :price, null: false
      t.integer :quantity, null: false, default: 0

      t.timestamps
    end
  end
end
