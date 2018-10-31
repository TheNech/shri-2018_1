const { allowTypes } = require('../config');

exports.getFormattedTime = function(ms) {
    const sec = ms / 1000;
    const hours = sec / 3600  % 24;
    const minutes = sec / 60 % 60;
    const seconds = sec % 60;

    return num(hours) + ":" + num(minutes) + ":" + num(seconds);
}

function num(value) {
    value = Math.floor(value);
    return value < 10 ? '0' + value : value;
}

exports.isTypeCorrect = function(types) {
    for(let i = 0; i < types.length; i++) {
        if(allowTypes.indexOf(types[i]) === -1) {
            return false;
        }
    }

    return true;
}

exports.filterDataByType = function(data, type) {
    let filterData = { events: [] }

    data.events.forEach(el => {
        if(type.indexOf(el.type) > -1) {
            filterData.events.push(el);
        }
    });

    return filterData;
}