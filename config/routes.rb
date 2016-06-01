Rails.application.routes.draw do

    mount ActionCable.server => '/cable'

    root 'document#new'
    post 'document/save'
    get '/time', to: 'time#index'
    get '/load', to: 'document#load'
    get '/present/:hash_key', to: 'document#present'
    get '/:hash_key', to: 'document#view'

end
