Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: { registrations: "registrations", omniauth_callbacks: "callbacks" }

  root to: "application#home"

  devise_scope :user do 
    get "login", to: "devise/sessions#new"
    get "signup", to: "devise/registrations#new"
    delete "logout", to: "devise/sessions#destroy"
  end

  scope :dishes do
    get "all", to: "dishes#all", as: "all_dishes"
  end

  resources :restaurants do
    resources :dishes, only: [:new, :show]
  end

  resources :dishes, only: [:index, :new, :create, :edit, :update, :destroy]

  resources :users, only: [:show]

end
