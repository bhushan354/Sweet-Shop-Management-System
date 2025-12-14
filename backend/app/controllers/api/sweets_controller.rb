module Api
  class SweetsController < ApplicationController
    before_action :authenticate_user, only: [:purchase, :create, :update, :destroy, :restock]
    before_action :authorize_admin!, only: [:create, :update, :destroy, :restock]

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

    def create
      sweet = Sweet.create!(sweet_params)
      render json: sweet, status: :created
    end

    def update
      sweet = Sweet.find(params[:id])
      sweet.update!(sweet_params)
      render json: sweet, status: :ok
    end

    def destroy
      Sweet.find(params[:id]).destroy
      head :no_content
    end
    
    def restock
      InventoryService.restock(params[:id], params[:amount].to_i)
      render json: { message: 'Restocked successfully' }, status: :ok
    end
    
    def purchase
      InventoryService.purchase(params[:id], params[:amount].to_i)
      render json: { message: 'Purchase successful' }, status: :ok
    end

    private

    def sweet_params
      params.permit(:name, :category, :price, :quantity)
    end
  end
end