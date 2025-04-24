import http from 'http';
import appModule from './app.js'
const port = 3000;

const server = http.createServer(appModule)


server.listen(port, ()=>{
    console.log("http://127.0.0.1:3000");
})