require 'rails_helper'

RSpec.describe AuthService do
  describe '.register' do
    it 'creates a user with valid attributes' do
      user = AuthService.register(
        email: 'test@example.com',
        password: 'password123'
      )

      expect(user).to be_persisted
      expect(user.email).to eq('test@example.com')
    end
  end

  describe '.login' do
    let!(:user) { create(:user, email: 'login@example.com', password: 'password123') }

    it 'returns user when credentials are correct' do
      authenticated_user = AuthService.login(
        email: 'login@example.com',
        password: 'password123'
      )

      expect(authenticated_user).to eq(user)
    end

    it 'raises error when password is incorrect' do
      expect {
        AuthService.login(
          email: 'login@example.com',
          password: 'wrongpassword'
        )
      }.to raise_error(StandardError)
    end
  end
end

