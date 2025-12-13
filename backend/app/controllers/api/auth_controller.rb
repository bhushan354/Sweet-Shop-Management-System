module Api
  class AuthController < ApplicationController
    def register
      user = AuthService.register(
        email: params[:email],
        password: params[:password]
      )

      token = JwtService.encode(user_id: user.id)

      render json: { token: token }, status: :created
    rescue StandardError
      render json: { error: 'Registration failed' }, status: :unprocessable_entity
    end

    def login
      user = AuthService.login(
        email: params[:email],
        password: params[:password]
      )

      token = JwtService.encode(user_id: user.id)

      render json: { token: token }, status: :ok
    rescue StandardError
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
