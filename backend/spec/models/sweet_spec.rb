require 'rails_helper'

RSpec.describe Sweet, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:category) }
  it { should validate_presence_of(:price) }
  it { should validate_presence_of(:quantity) }

  it { should validate_numericality_of(:price).is_greater_than(0) }
  it { should validate_numericality_of(:quantity).is_greater_than_or_equal_to(0) }
end
