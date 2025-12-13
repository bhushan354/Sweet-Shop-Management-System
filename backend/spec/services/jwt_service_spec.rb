require 'rails_helper'

RSpec.describe JwtService do
  let(:user) { create(:user) }

  describe '.encode' do
    it 'returns a token for a user' do
      token = JwtService.encode(user_id: user.id)

      expect(token).to be_a(String)
    end
  end

  describe '.decode' do
    it 'returns payload for a valid token' do
      token = JwtService.encode(user_id: user.id)
      payload = JwtService.decode(token)

      expect(payload['user_id']).to eq(user.id)
    end

    it 'raises error for invalid token' do
      expect {
        JwtService.decode('invalid.token')
      }.to raise_error(StandardError)
    end
  end
end
