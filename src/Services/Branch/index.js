import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/branchs', { params })
}

const createBranch = async (values) => {
  return await axiosIntance.post('/branchs', values)
}

const updateBranch = async (values) => {
  return await axiosIntance.put(`/branchs/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/branchs/${values.id}`)
}


export { 
  getAll, 
  getById,
  createBranch, 
  updateBranch, 
}
