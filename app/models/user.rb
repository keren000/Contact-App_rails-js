class User < ApplicationRecord
  has_many :albums
  
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  has_secure_password

end
