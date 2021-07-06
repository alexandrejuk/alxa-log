import axios from 'axios'

const baseURL = `http://localhost:3003/api`

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}))

export default axiosInstance
