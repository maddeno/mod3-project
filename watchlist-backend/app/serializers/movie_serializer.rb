class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :release, :director, :image_url, :genre, :description
end
