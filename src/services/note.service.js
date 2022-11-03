import createApiClient from '@/services/api.service'

class NoteService {
  constructor(baseURL = '/api/notes') {
    this.api = createApiClient(baseURL)
  }

  async getAllNotes() {
    return (await this.api.get('/')).data
  }
  async getUserNotes(email) {
    return (await this.api.get('/', { params: { email: email } })).data
  }
  async updateNote(payload) {
    if (payload.description) {
      return (await this.api.put(`/${payload.id}`, { description: payload.description })).data
    } else if (payload.state) {
      return (await this.api.put(`/${payload.id}`, { state: payload.state })).data
    }
  }
  async deleteNote(id) {
    return (await this.api.delete(`/${id}`)).data
  }
  // async updateNoteState(id, nextState) {
  //   return (await this.api.put(`/${id}`, { params: { state: nextState } })).data
  // }
}

export default new NoteService()
