import axios from 'axios'

const baseUrl =`http://localhost:3003/auth/login`

const auth = async (values) => {
  return await axios.post(baseUrl, values)
}

export default auth
