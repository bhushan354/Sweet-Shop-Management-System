require 'rails_helper'

RSpec.describe 'Admin Sweets API', type: :request do
  let!(:admin) { create(:user, role: :admin) }
  let!(:user)  { create(:user) }
  let!(:sweet) { Sweet.create!(name: 'Ladoo', category: 'Indian', price: 10, quantity: 5) }

  def auth_headers(user)
    token = JwtService.encode(user_id: user.id)
    { 'Authorization' => "Bearer #{token}" }
  end

  describe 'POST /api/sweets' do
    it 'allows admin to create sweet' do
      post '/api/sweets',
           params: { name: 'Barfi', category: 'Indian', price: 15, quantity: 10 },
           headers: auth_headers(admin)

      expect(response).to have_http_status(:created)
    end

    it 'rejects non-admin user' do
      post '/api/sweets',
           params: { name: 'Barfi', category: 'Indian', price: 15, quantity: 10 },
           headers: auth_headers(user)

      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'POST /api/sweets/:id/restock' do
    it 'allows admin to restock sweet' do
      post "/api/sweets/#{sweet.id}/restock",
           params: { amount: 5 },
           headers: auth_headers(admin)

      expect(sweet.reload.quantity).to eq(10)
    end
  end

  describe 'DELETE /api/sweets/:id' do
    it 'allows admin to delete sweet' do
      delete "/api/sweets/#{sweet.id}",
             headers: auth_headers(admin)

      expect(response).to have_http_status(:no_content)
    end
  end
end
