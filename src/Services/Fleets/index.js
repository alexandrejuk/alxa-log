import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/fleets', { params })
}

const createFleet = async (values) => {
  return await axiosIntance.post('/fleets', values)
}

const updateFleet = async (values) => {
  return await axiosIntance.put(`/fleets/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/fleets/${values.id}`)
}


export { 
  getAll, 
  getById,
  createFleet, 
  updateFleet, 
}
