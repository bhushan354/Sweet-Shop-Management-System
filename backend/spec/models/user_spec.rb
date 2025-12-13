require 'rails_helper'

RSpec.describe User, type: :model do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should define_enum_for(:role).with_values(user: 0, admin: 1) }

    it { should have_secure_password }

end