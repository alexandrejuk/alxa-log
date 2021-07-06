import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/companies', { params })
}

const createBranch = async (values) => {
  return await axiosIntance.post('/companies', values)
}

const updateBranch = async (values) => {
  return await axiosIntance.put(`/companies/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/companies/${values.id}`)
}


export { 
  getAll, 
  getById,
  createBranch, 
  updateBranch, 
}
