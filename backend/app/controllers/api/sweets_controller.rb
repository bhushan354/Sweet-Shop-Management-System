module Api
  class SweetsController < ApplicationController
    before_action :authenticate_user, only: [:purchase]

    def index
      sweets = Sweet.all
      render json: sweets, status: :ok
    end

    def search
      sweets = Sweet.all

      sweets = sweets.where(category: params[:category]) if params[:category]
      sweets = sweets.where('price >= ?', params[:min_price]) if params[:min_price]
      sweets = sweets.where('price <= ?', params[:max_price]) if params[:max_price]
      sweets = sweets.where('name ILIKE ?', "%#{params[:name]}%") if params[:name]

      render json: sweets, status: :ok
    end

    def purchase
      InventoryService.purchase(params[:id], params[:amount].to_i)
      render json: { message: 'Purchase successful' }, status: :ok
    end
  end
end