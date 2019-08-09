class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user| 
      user.provider = auth.provider
      user.name = auth.info.name
      user.email = auth.info.email
      user.uid = auth.uid
      user.password = Devise.friendly_token[0,20]
    end
  end

  has_many :dishes
  has_many :restaurants, through: :dishes
end
