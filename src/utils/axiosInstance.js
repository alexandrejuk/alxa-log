import axios from 'axios'

const baseURL = `${process.env.REACT_APP_API_URL || 'http://localhost:3003'}`

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}))

export default axiosInstance
