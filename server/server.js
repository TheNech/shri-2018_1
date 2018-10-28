"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8000;
const startDate = new Date();
const data = require('./data/events.json');
const functions_1 = require("./app/functions");
const config_1 = require("./config");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
app.get('/status', (req, res) => {
    let currentDate = new Date();
    let timeDiff = Number(currentDate) - Number(startDate);
    res.send(functions_1.getFormatedTime(timeDiff));
});
app.get('/api/events', (req, res) => {
    if (req.query.type) {
        let type = req.query.type.split(':');
        if (!functions_1.isTypeCorrect(type)) {
            res.status(400).send('incorrect type');
        }
        else if (type.length === config_1.allowTypes.length) {
            res.json(data);
        }
        else {
            res.json(functions_1.filterDataByType(data, type));
        }
    }
    else {
        res.json(data);
    }
});
app.post('/api/events', (req, res) => {
    if (req.body.type) {
        let type = req.body.type.split(':');
        if (!functions_1.isTypeCorrect(type)) {
            res.status(400).send('incorrect type');
        }
        else if (type.length === config_1.allowTypes.length) {
            res.json(data);
        }
        else {
            res.json(functions_1.filterDataByType(data, type));
        }
    }
    else {
        res.json(data);
    }
});
app.get('/*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
