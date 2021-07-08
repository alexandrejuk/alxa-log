import axiosIntance from '../../utils/axiosInstance'
import axios from 'axios'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders', { params })
}

const createMaintenanceOrder = async (values) => {
  return await axiosIntance.post('/maintenance-orders', values)
}

const updateMaintenanceOrder = async (values) => {
  return await axiosIntance.put(`/maintenance-orders/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/maintenance-orders/${id}`)
}

const updateEvents = async (id, values) => {
  return await axiosIntance.put(`/maintenance-order-events/${id}`, values)
}

const getMobileQrCode = async (id) => {
  return await axios.get(`https://jls-prd.herokuapp.com/qrcode-detail/${id}`)
}


export { 
  getAll, 
  getById,
  createMaintenanceOrder, 
  updateMaintenanceOrder,
  updateEvents,
  getMobileQrCode
}
