import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/drivers', { params })
}

const createDriver = async (values) => {
  return await axiosIntance.post('/drivers', values)
}

const updateDriver = async (values) => {
  return await axiosIntance.put(`/drivers/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/drivers/${id}`)
}


export { 
  getAll, 
  getById,
  createDriver, 
  updateDriver, 
}
