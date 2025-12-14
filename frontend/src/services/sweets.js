import api from './api'

export const fetchSweets = async (params = {}) => {
  const hasFilters = Object.keys(params).length > 0

  const url = hasFilters ? '/sweets/search' : '/sweets'
  const response = await api.get(url, { params })

  return response.data
}

export const purchaseSweet = async (id, amount = 1) => {
  const response = await api.post(`/sweets/${id}/purchase`, { amount })
  return response.data
}