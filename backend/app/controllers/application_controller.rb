class ApplicationController < ActionController::API
  attr_reader :current_user

  private

  def authenticate_user
    header = request.headers['Authorization']
    return unauthorized unless header&.start_with?('Bearer ')

    token = header.split(' ').last
    payload = JwtService.decode(token)
    @current_user = User.find(payload['user_id'])
  rescue StandardError
    unauthorized
  end

  def unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
    false
  end

  def authorize_admin!
    return if current_user&.admin?

    render json: { error: 'Forbidden' }, status: :forbidden
    false
  end

end
