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
    return (await this.api.get('/user', { params: { auth_token: token } })).data
  }
  async getUserRole(token) {
    return (await this.api.get('/role', { params: { role: token } })).data
  }
  async getUserByEmail(email) {
    return (await this.api.get('/', { params: { email: email } })).data
  }
  async createAccount(payload) {
    return (await this.api.post('/register', payload)).data
  }
  async updateUserInfo(email, payload) {
    console.log(payload)

    return (await this.api.patch(`/${email}`, payload)).data
  }
  async delete(email) {
    return (await this.api.delete(`/${email}`)).data
  }
}

export default new AccountService()
