require 'rails_helper'

RSpec.describe 'Sweets API', type: :request do
  describe 'GET /api/sweets' do
    it 'returns all sweets' do
      Sweet.create!(name: 'Ladoo', category: 'Indian', price: 10, quantity: 5)
      Sweet.create!(name: 'Barfi', category: 'Indian', price: 15, quantity: 3)

      get '/api/sweets'

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body.length).to eq(2)
    end
  end

  describe 'GET /api/sweets/search' do
    it 'filters sweets by category' do
      Sweet.create!(name: 'Ladoo', category: 'Indian', price: 10, quantity: 5)
      Sweet.create!(name: 'Chocolate', category: 'Western', price: 20, quantity: 5)

      get '/api/sweets/search', params: { category: 'Indian' }

      body = JSON.parse(response.body)
      expect(body.length).to eq(1)
      expect(body.first['name']).to eq('Ladoo')
    end
  end
end
