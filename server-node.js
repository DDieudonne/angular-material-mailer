const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const app = express();
const configmailer = require('./server/config-mailer');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || '3001';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/dist/angular-mailer'));


app.post('/sendMail', (req, res) => {
    configmailer(req.body);
    res.status(200).send();
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));