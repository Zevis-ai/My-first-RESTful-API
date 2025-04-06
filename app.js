const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    
    next();
})

app.use(express.json());

// app.use((req, res, next) => {
//     req.on('data', (chunk) => {
//         console.log(`Received chunk: ${chunk}`);
//     });
//     req.on('end', () => {
//         next();
//     });
// });



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

app.post('/articles', (req, res) => {
    res.status(200).json({ message: req.body.message });
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;