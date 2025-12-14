# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Sweet.destroy_all

Sweet.create!([
  {
    name: "Kaju Katli",
    category: "Indian",
    price: 500,
    quantity: 20
  },
  {
    name: "Gulab Jamun",
    category: "Indian",
    price: 300,
    quantity: 30
  },
  {
    name: "Rasgulla",
    category: "Indian",
    price: 280,
    quantity: 0
  },
  {
    name: "Chocolate Brownie",
    category: "Bakery",
    price: 150,
    quantity: 15
  },
  {
    name: "Cupcake",
    category: "Bakery",
    price: 120,
    quantity: 10
  }
])

puts "Sweets seeded successfully!"

User.find_or_create_by!(email: "user@gmail.com") do |user|
  user.password = "12345678"
  user.role = :user
end

User.find_or_create_by!(email: "admin@gmail.com") do |admin|
  admin.password = "87654321"
  admin.role = :admin
end

puts "Users seeded successfully!"
puts "Normal User: user@gmail.com / 12345678"
puts "Admin User: admin@gmail.com / 87654321"
