class MovieSerializer < ActiveModel::Serializer
  attributes :id,:title, :release, :director, :image_url, :genre, :description
end
