import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/operations', { params })
}

const createOperations = async (values) => {
  return await axiosIntance.post('/operations', values)
}

const updateOperations = async (values) => {
  return await axiosIntance.put(`/operations/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/operations/${values.id}`)
}


export { 
  getAll, 
  getById,
  createOperations, 
  updateOperations, 
}