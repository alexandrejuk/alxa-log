import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/maintenanceOrders', { params })
}

const createMaintenanceOrder = async (values) => {
  return await axiosIntance.post('/maintenanceOrders', values)
}

const updateMaintenanceOrder = async (values) => {
  return await axiosIntance.put(`/maintenanceOrders/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/maintenanceOrders/${values.id}`)
}

export { 
  getAll, 
  getById,
  createMaintenanceOrder, 
  updateMaintenanceOrder, 
}
