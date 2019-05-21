class AlbumsController < ApplicationController
   before_action :find_album, only: [:show, :edit, :update, :destroy]
    
  # GET /albums
  # GET /albums.json
  def index
    @albums = current_user.albums.paginate(page: params[:page], per_page: 4)
  end

  # GET /albums/1
  # GET /albums/1.json
  def show
  end

  def new
    @album = Album.new
  end

  # POST /albums
  # POST /albums.json
  def create
    ash = album_params;
    ash[:user_id] = current_user.id;
    @album =  Album.new(ash);
    
    respond_to do |format|
      if @album.save
        format.html {redirect_to albums_path, notice: "Contact #{@album.name} has been uploaded!"}
        format.json { render :show, status: :created, location: @albums}
      else
        format.html { render action: "new" }
        format.json { render json: @albums.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end 

  # PATCH/PUT /albums/1
  # PATCH/PUT /albums/1.json
  def update
    respond_to do |format|
      if @album.update(album_params)
        format.html {redirect_to albums_path, notice: "Contact #{@album.name} has been successfully updated!"}
        format.json {@albums}
      else
        format.html {render 'edit'}
        format.json {render json: @albums.errors, status: :unprocessable_entity}
      end   
    end
  end


  # DELETE /albums/1
  # DELETE /albums/1.json
  def destroy    
    @album.destroy
    respond_to do |format|
      format.html {redirect_to albums_path, notice: "Contact #{@album.name} has been successfully deleted!"}
      format.json {head :no_content} 
    end
  end

private
 def find_album
    @album = current_user.albums.find(params[:id])
  end
  
  def album_params
    params.require(:album).permit(:name, :phone, :email, :address, :avatar)
  end
end
