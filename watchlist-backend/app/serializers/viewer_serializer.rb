class ViewerSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  attributes :username, :id, :watchlists
  has_many :watchlists
  has_many :movies

end
