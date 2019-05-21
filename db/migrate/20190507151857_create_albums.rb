class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
       t.string :name
       t.integer :phone
       t.string :email
       t.string :address
       t.belongs_to :user

       t.timestamps
    end
  end
end
