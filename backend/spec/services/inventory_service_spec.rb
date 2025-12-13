require 'rails_helper'

RSpec.describe InventoryService do
  let!(:sweet) { Sweet.create!(name: 'Ladoo', category: 'Indian', price: 10, quantity: 5) }

  describe '.purchase' do
    it 'decreases quantity when stock is available' do
      InventoryService.purchase(sweet.id, 2)

      expect(sweet.reload.quantity).to eq(3)
    end

    it 'raises error when stock is insufficient' do
      expect {
        InventoryService.purchase(sweet.id, 10)
      }.to raise_error(StandardError)
    end
  end

  describe '.restock' do
    it 'increases quantity' do
      InventoryService.restock(sweet.id, 5)

      expect(sweet.reload.quantity).to eq(10)
    end
  end
end
