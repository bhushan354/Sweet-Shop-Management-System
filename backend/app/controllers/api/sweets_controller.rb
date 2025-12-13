module Api
  class SweetsController < ApplicationController
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
  end
end

