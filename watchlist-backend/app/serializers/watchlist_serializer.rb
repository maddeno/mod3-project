class WatchlistSerializer
  include FastJsonapi::ObjectSerializer
  attributes  :id, :movie_id, :viewer_id, :watched
  
def initialize(watchlist_object)
  @watchlist = watchlist_object
 end
  
 def to_serialized_json
  options = {
    include: {
      movie: {
        only: [:title, :id]
      },
      viewer: {
        only: [:username, :id]
      }
    },
    except: [:updated_at],
  }
  @watchlist.to_json(options)
 end
 
end
