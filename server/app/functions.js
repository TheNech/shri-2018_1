"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
function getFormatedTime(ms) {
    // 1 s = 1000 ms
    let sec = ms / 1000;
    let hours = sec / 3600 % 24;
    let minutes = sec / 60 % 60;
    let seconds = sec % 60;
    return num(hours) + ":" + num(minutes) + ":" + num(seconds);
}
exports.getFormatedTime = getFormatedTime;
function num(value) {
    value = Math.floor(value);
    return value < 10 ? '0' + value : value;
}
function isTypeCorrect(types) {
    for (let i = 0; i < types.length; i++) {
        if (!config_1.allowTypes.includes(types[i])) {
            return false;
        }
    }
    return true;
}
exports.isTypeCorrect = isTypeCorrect;
function filterDataByType(data, type) {
    let filteredData = [];
    filteredData = data.events.filter((value) => config_1.allowTypes.includes(value.type));
    return { events: filteredData };
}
exports.filterDataByType = filterDataByType;
