json.array!(@albums_id) do |album|
  json.extract! album, :id, :name, :phone, :email, :address, :avatar
  json.url album_url(album, format: :json)
end
