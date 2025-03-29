require('dotenv').config();
require('body-parser')
let express = require('express');
let app = express();

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.use('/public', express.static(__dirname + '/public'));
console.log('Hello World')
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})
app.get('/json', (req, res) => {
    let message = 'Hello json';

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }

    res.json({ message });
});
app.get('/now', (req, res, next) => {    
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
})
app.get('/:word/echo', (req, res) => {    
    res.json({ echo: req.params.word });
})
app.get('/name', (req, res) => {    
    res.json({ name: `${req.query.first} ${req.query.last}` });
})
app.post('/name', (req, res) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({ name: `${firstName} ${lastName}` });
});





































 module.exports = app;
