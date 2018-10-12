const express = require('express');
const app = express();
const port = 8000;

const startDate = new Date();

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }

    console.log(`Server is listening on ${port}`);
})

app.get('/status', (req, res) => {
    let currentDate = new Date();
    let timeDiff = currentDate - startDate;

    res.send(getFornatedTime(timeDiff));
})

function getFornatedTime(ms) {
    let sec = ms / 1000;
    let hours = sec / 3600  % 24;
    let minutes = sec / 60 % 60;
    let seconds = sec % 60;

    return num(hours) + ":" + num(minutes) + ":" + num(seconds);
}

function num(value) {
    value = Math.floor(value);
    return value < 10 ? '0' + value : value;
}
