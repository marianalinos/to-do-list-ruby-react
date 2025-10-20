Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :todos, only: [ :index, :show, :create, :update, :destroy ] do
      resources :tasks, only: [ :index, :show, :create, :update, :destroy ]
    end
  end
  get "up" => "rails/health#show", as: :rails_health_check
end
