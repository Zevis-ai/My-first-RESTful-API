import { api } from './api.js'
const appdiv = document.getElementById('app')


appdiv.innerHTML = `
  <h1>Hello </h1>
  `

  const init = () => {
    api()
  }

  init()