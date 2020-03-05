class WatchlistSerializer < ActiveModel::Serializer

  attributes  :id, :movie_id, :viewer_id, :watched, :movie, :viewer
  belongs_to :movie
  belongs_to :viewer
 
end
