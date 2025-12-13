require 'rails_helper'

RSpec.describe 'Auth API', type: :request do
  describe 'POST /api/auth/register' do
    it 'registers a new user and returns token' do
      post '/api/auth/register', params: {
        email: 'newuser@example.com',
        password: 'password123'
      }

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)

      expect(body['token']).to be_present
    end
  end

  describe 'POST /api/auth/login' do
    let!(:user) { create(:user, email: 'login@example.com', password: 'password123') }

    it 'logs in user and returns token' do
      post '/api/auth/login', params: {
        email: 'login@example.com',
        password: 'password123'
      }

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body['token']).to be_present
    end

    it 'returns unauthorized for invalid credentials' do
      post '/api/auth/login', params: {
        email: 'login@example.com',
        password: 'wrongpassword'
      }

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
