import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDe4AndikBmR6UimHwfN75_J_rc11_Jeyw',
  authDomain: 'easynotestorage.firebaseapp.com',
  projectId: 'easynotestorage',
  storageBucket: 'easynotestorage.appspot.com',
  messagingSenderId: '959963367053',
  appId: '1:959963367053:web:ffddb04bb244d5dc8584c4',
  measurementId: 'G-ZQF8TNF82B'
}
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)
export { storage }
