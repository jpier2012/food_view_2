# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: "test@test.com", password: "password", password_confirmation: "password")
user2 = User.create(email: "test2@test.com", password: "password", password_confirmation: "password")

american = Restaurant.create(name: "McDonald's", address: "Chicago, IL", dress_code: "Formal", cuisine: "American", outdoor_seating: true, child_friendly: true, created_by: user.id)
chinese = Restaurant.create(name: "Yen Yen", address: "Buffalo Grove, IL", dress_code: "Casual", cuisine: "Chinese", open_bar: true, byob: true, child_friendly: true, created_by: user.id)
thai = Restaurant.create(name: "Thai Frenzy", address: "All over the place", dress_code: "Casual", cuisine: "Thai", byob: true, outdoor_seating: true, created_by: user.id)
mexican = Restaurant.create(name: "Martin's Tacos", address: "Hanover, IL", dress_code: "No Shorts", cuisine: "Mexican", outdoor_seating: true, child_friendly: true, created_by: user2.id)
bbq = Restaurant.create(name: "Billy's BBQ", address: "Buffalo, NY", dress_code: "No Ridiculous Hats", cuisine: "BBQ", open_bar: true, created_by: user2.id)
french = Restaurant.create(name: "Jean's Croissants", address: "Paris, France", dress_code: "Suits Only", cuisine: "French", open_bar: true, byob: true, created_by: user2.id)

a = user.dishes.create(name: "Cheeseburger", price: 10, restaurant: american)
a.photo.attach(io: File.open('app/assets/images/red-robin-burger-gourmet-cheeseburger_large.jpg'), filename: 'red-robin-burger-gourmet-cheeseburger_large.jpg', content_type: 'image/jpg')

user.dishes.create(name: "Quarter Pounder", price: 6.75, restaurant: american)
user.dishes.create(name: "Big Mac", price: 10.08, restaurant: american)


b = user.dishes.create(name: "Kung Pao Chicken", price: 12.15, restaurant: chinese)
b.photo.attach(io: File.open('app/assets/images/kung-pao-chicken-thumb.jpg'), filename: 'kung-pao-chicken-thumb.jpg', content_type: 'image/jpg')

user.dishes.create(name: "Sweet & Sour Pork", price: 8.00, restaurant: chinese)
user.dishes.create(name: "Chop Suey", price: 5.41, restaurant: chinese)

c = user.dishes.create(name: "Steak Tacos", price: 6.99, restaurant: mexican)
c.photo.attach(io: File.open('app/assets/images/menu_small__Steak_Tacos_with_Chimichurri_THUMB.jpg'), filename: 'menu_small__Steak_Tacos_with_Chimichurri_THUMB.jpg', content_type: 'image/jpg')

d = user2.dishes.create(name: "Pad Thai", price: 7.95, restaurant: thai)
d.photo.attach(io: File.open('app/assets/images/Pad-Thai-7.jpg'), filename: 'Pad-Thai-7.jpg', content_type: 'image/jpg')

e = user2.dishes.create(name: "Full Rack of Ribs", price: 18.95, restaurant: bbq)
e.photo.attach(io: File.open('app/assets/images/full-rack-ribs.jpg'), filename: 'full-rack-ribs.jpg', content_type: 'image/jpg')

f = user2.dishes.create(name: "A Bag of Croissants", price: 10.95, restaurant: french)
f.photo.attach(io: File.open('app/assets/images/croissants-1-copy-1024x683.jpg'), filename: 'croissants-1-copy-1024x683.jpg', content_type: 'image/jpg')