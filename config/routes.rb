Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: { registrations: "registrations", omniauth_callbacks: "callbacks" }

  root to: "application#home"

  scope :filters do 
    get "", to: "users#show_filters", as: "show_filters"
    post "", to: "users#edit_filters", as: "edit_filters"
    delete "", to: "users#clear_filters", as: "clear_filters"
  end

  devise_scope :user do 
    get "login", to: "devise/sessions#new"
    get "signup", to: "devise/registrations#new"
    delete "logout", to: "devise/sessions#destroy"
  end

  scope :dishes do
    get "all", to: "dishes#all", as: "all_dishes"
  end

  scope :restaurants do
    get "all", to: "restaurants#all", as: "all_restaurants"
    get "demo", to: "restaurants#js_restaurant_demo"
  end

  resources :restaurants do
    resources :dishes, only: [:new, :show]
  end

  resources :dishes, only: [:index, :new, :create, :edit, :update, :destroy]

  resources :users, only: [:index, :show]

end
