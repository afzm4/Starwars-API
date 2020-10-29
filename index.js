const express = require('express')
const app = express()
const https = require('https')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello, welcome to my Swapi.dev API')
});

var favorites = [];

app.get('/starwars', (req, res) => {
    https.get(`https://swapi.dev/api/${req.query.category}/${req.query.number}/`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(JSON.parse(data));
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.post('/favorites/:number', (req, res) => {
    https.get(`https://swapi.dev/api/people/${req.params.number}/`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            favorites.push(JSON.parse(data));
            res.send(JSON.parse(data));
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.get('/favorites', (req, res) => {
    res.send(favorites);
});

app.delete('/favorites/:name', (req, res) => {
    let noChar = favorites.filter(x => x.name !== req.params.name);
    favorites = noChar;
    res.send(favorites);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})