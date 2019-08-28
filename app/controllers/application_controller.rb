class ApplicationController < ActionController::Base
    before_action :authenticate_user!, except: [:home]
    
    def home
        @users = User.all
    end
end
