class AuthService
  def self.register(email:, password:)
    User.create!(
      email: email,
      password: password
    )
  end

  def self.login(email:, password:)
    user = User.find_by(email: email)

    raise StandardError, 'Invalid credentials' unless user&.authenticate(password)

    user
  end
end
