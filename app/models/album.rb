class Album < ApplicationRecord
  belongs_to :user
  
  validates :name, :phone, :email, :address, :avatar, presence: true # Make sure the owner's name is present.

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" },
   default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
end
