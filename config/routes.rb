Rails.application.routes.draw do
  
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  #facebook login
  get '/auth/facebook/callback' => 'sessions#facebookcreate'

  get '/logout' => 'sessions#destroy'
  #register
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :albums
  root  "home#index"
  resources :users 
end
