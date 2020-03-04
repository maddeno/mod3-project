class ViewerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username , :id
  has_many :watchlists

end
