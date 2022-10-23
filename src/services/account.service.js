import createApiClient from '@/services/api.service'
import router from '@/routers'

class AccountService {
  constructor(baseURL = '/api/accounts') {
    this.api = createApiClient(baseURL)
  }

  async getAllAccounts() {
    return (await this.api.get('/')).data
  }
  async login(loginInfo) {
    return (await this.api.post('/login', loginInfo)).data
  }
  async getUser(token) {
    try {
      await this.api.interceptors.request.use(
        (config) => {
          config.headers['auth_token'] = token
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )
      return (await this.api.get('/user')).data
    } catch (error) {}
  }
  async create(payload) {
    return (await this.api.post('/register', payload)).data
  }
}

export default new AccountService()
