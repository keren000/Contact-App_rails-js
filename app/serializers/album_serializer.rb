class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone, :email, :address, :avatar
  
  belongs_to :user
end
