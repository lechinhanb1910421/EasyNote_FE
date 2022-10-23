import createApiClient from '@/services/api.service'

class NoteService {
  constructor(baseURL = '/api/notes') {
    this.api = createApiClient(baseURL)
  }

  async getAllNotes() {
    return (await this.api.get('/')).data
  }
}

export default new NoteService()
