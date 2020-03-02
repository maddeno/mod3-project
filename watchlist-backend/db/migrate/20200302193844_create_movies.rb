class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :release
      t.string :director
      t.string :image_url
      t.string :genre
      t.string :description

      t.timestamps
    end
  end
end
