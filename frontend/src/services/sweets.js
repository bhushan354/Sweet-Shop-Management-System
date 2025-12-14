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

// services of admin only
export const createSweet = async (data) => {
  const response = await api.post('/sweets', data)
  return response.data
}

export const updateSweet = async (id, data) => {
  const response = await api.put(`/sweets/${id}`, data)
  return response.data
}

export const deleteSweet = async (id) => {
  await api.delete(`/sweets/${id}`)
}

export const restockSweet = async (id, amount) => {
  const response = await api.post(`/sweets/${id}/restock`, { amount })
  return response.data
}