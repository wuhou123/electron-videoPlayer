import axios from 'axios'

axios.defaults.baseURL = 'http://api.eyunzhu.com/api'

axios.defaults.withCredentials = false

axios.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      return Promise.reject(response.data)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
