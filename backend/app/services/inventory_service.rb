class InventoryService
  def self.purchase(sweet_id, amount)
    sweet = Sweet.find(sweet_id)

    raise StandardError, 'Insufficient stock' if sweet.quantity < amount

    sweet.update!(quantity: sweet.quantity - amount)
  end

  def self.restock(sweet_id, amount)
    sweet = Sweet.find(sweet_id)

    sweet.update!(quantity: sweet.quantity + amount)
  end
end
