class CreateWatchlists < ActiveRecord::Migration[6.0]
  def change
    create_table :watchlists do |t|
      t.references :movie, null: false, foreign_key: true
      t.references :viewer, null: false, foreign_key: true

      t.boolean :watched
      
      t.timestamps
    end
  end
end
