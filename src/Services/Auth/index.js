import axios from 'axios'

const baseUrl =`http://jls-prd.herokuapp.com/auth/login`

const auth = async (values) => {
  return await axios.post(baseUrl, values)
}

export default auth
