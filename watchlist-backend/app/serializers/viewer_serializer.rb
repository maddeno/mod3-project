class ViewerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :id, :watchlists,
  has_many :watchlists

end
