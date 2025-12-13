require 'rails_helper'

RSpec.describe 'Sweet Purchase API', type: :request do
  let!(:sweet) { Sweet.create!(name: 'Ladoo', category: 'Indian', price: 10, quantity: 5) }
  let!(:user) { create(:user) }

  def auth_headers(user)
    token = JwtService.encode(user_id: user.id)
    { 'Authorization' => "Bearer #{token}" }
  end

  it 'allows authenticated user to purchase sweet' do
    post "/api/sweets/#{sweet.id}/purchase",
         params: { amount: 2 },
         headers: auth_headers(user)

    expect(response).to have_http_status(:ok)
    expect(sweet.reload.quantity).to eq(3)
  end

  it 'rejects unauthenticated user' do
    post "/api/sweets/#{sweet.id}/purchase", params: { amount: 1 }

    expect(response).to have_http_status(:unauthorized)
  end
end
