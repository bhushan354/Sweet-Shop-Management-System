import api from './api'

export const fetchSweets = async () => {
  const response = await api.get('/sweets')
  return response.data
}

export const purchaseSweet = async (id, amount = 1) => {
  const response = await api.post(`/sweets/${id}/purchase`, { amount })
  return response.data
}