import axios from 'axios'
const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

function createApiClient(baseURL) {
  return axios.create({
    baseURL,
    ...commonConfig
  })
}
export default createApiClient
