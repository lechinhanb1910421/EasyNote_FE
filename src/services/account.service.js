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
      return (await this.api.get('/user', { params: { auth_token: token } })).data
    } catch (error) {}
  }
  async createAccount(payload) {
    return (await this.api.post('/register', payload)).data
  }
  async getNotes(email) {
    return (await this.api.get('/notes', payload)).data
  }
}

export default new AccountService()
