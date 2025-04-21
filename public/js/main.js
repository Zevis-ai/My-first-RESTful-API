// import { api } from './api.js'
import { login } from './login.js'
import { listener } from './listeners.js'
const init = () => {
  login()
  // api()
  listener()
}

init()