class MovieSerializer < ActiveModel::Serializer
  attributes :id,:title, :release, :director, :image_url, :genre, :description
  has_many :watchlists
  has_many :viewers
end
