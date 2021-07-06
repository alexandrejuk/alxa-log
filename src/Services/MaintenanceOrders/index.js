import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders', { params })
}

const createMaintenanceOrder = async (values) => {
  return await axiosIntance.post('/maintenance-orders', values)
}

const updateMaintenanceOrder = async (values) => {
  return await axiosIntance.put(`/maintenance-orders/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/maintenance-orders/${values.id}`)
}

export { 
  getAll, 
  getById,
  createMaintenanceOrder, 
  updateMaintenanceOrder, 
}
