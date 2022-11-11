import createApiClient from '@/services/api.service'

class FeedbackService {
  constructor(baseURL = '/api/feedbacks') {
    this.api = createApiClient(baseURL)
  }
  async getAllFeedbacks() {
    return (await this.api.get('/')).data
  }
  async addFeedback(payload) {
    return (await this.api.post('/', payload)).data
  }

  async deleteFeedback(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new FeedbackService()
