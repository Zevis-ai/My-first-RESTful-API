import http from 'http';
import appModule from './app.js'
const port = 3000;

const server = http.createServer(appModule)


server.listen(port)