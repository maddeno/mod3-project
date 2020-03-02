class Movie < ApplicationRecord
    has_many :watchlists
    has_many :viewers, through: :watchlists
end
