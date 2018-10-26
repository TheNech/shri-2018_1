var container = document.querySelector('#touch-container');
var image = document.querySelector('#touch-img');
var zoomText = document.querySelector('#img-zoom');
var currentPointerEvents = {};
var imageState = {
    scale: 1.5,
    scaleMin: 1.5,
    scaleMax: 3,
    translateX: 0,
    paddingX: 0,
    brightMin: .2,
    bright: 1,
    brightMax: 4
};
imageState.paddingX = (container.offsetWidth - container.offsetWidth / imageState.scale) / 2;
var gesture = {
    type: '',
    startDist: 0,
    startScale: 0,
    startBright: 0,
    startAngle: 0,
    angleDiff: 0
};
container.addEventListener('pointerdown', function (event) {
    container.setPointerCapture(event.pointerId);
    currentPointerEvents[event.pointerId] = event;
    if (!gesture.type) {
        gesture.type = 'move';
    }
});
var imageParams = {
    pos: document.querySelector('.image-params__pos').innerText,
    scale: document.querySelector('.image-params__scale').innerText,
    bright: document.querySelector('.image-params__bright').innerText
};
var setImageParams = function (name, value) {
    imageParams[name] = Math.round(value * 100) / 100;
};
var setTransform = function (dx) {
    var paddingX = imageState.paddingX, scale = imageState.scale;
    if (dx < 0 && (imageState.translateX + dx) < -paddingX) {
        imageState.translateX = -paddingX;
    }
    else if (dx > 0 && (imageState.translateX + dx) > paddingX) {
        imageState.translateX = paddingX;
    }
    else {
        imageState.translateX += dx;
    }
    image.style.transform = "scale(" + scale + ") translateX(" + imageState.translateX + "px)";
    setImageParams('scale', imageState.scale);
    setImageParams('pos', -imageState.translateX);
};
var getDistance = function (e1, e2) {
    var x1 = e1.clientX, y1 = e1.clientY;
    var x2 = e2.clientX, y2 = e2.clientY;
    return Math.sqrt(Math.pow((x1 - x2), 2) - Math.pow((y1 - y2), 2));
};
var getAngle = function (e1, e2) {
    var x1 = e1.clientX, y1 = e1.clientY;
    var x2 = e2.clientX, y2 = e2.clientY;
    var r = Math.atan2(x2 - x1, y2 - y1);
    return 360 - (180 + Math.round(r * 180 / Math.PI));
};
container.addEventListener('pointermove', function (event) {
    var pointersCount = Object.keys(currentPointerEvents).length;
    if (pointersCount === 0 || !gesture.type) {
        return;
    }
    if (pointersCount === 1 && gesture.type === 'move') {
        var previousEvent = currentPointerEvents[event.pointerId];
        var dx = event.clientX - previousEvent.clientX;
        setTransform(dx);
        currentPointerEvents[event.pointerId] = event;
    }
    else if (pointersCount === 2) {
        currentPointerEvents[event.pointerId] = event;
        // const events = Object.values(currentPointerEvents);
        var events = [];
        for (var key in currentPointerEvents) {
            events.push(currentPointerEvents[key]);
        }
        var dist = getDistance(events[0], events[1]);
        var angle = getAngle(events[0], events[1]);
        if (!gesture.startDist) {
            gesture.startScale = imageState.scale;
            gesture.startDist = dist;
            gesture.startBright = imageState.bright;
            gesture.startAngle = angle;
            gesture.angleDiff = 0;
            gesture.type = null;
        }
        var diff = dist / gesture.startDist;
        var angleDiff = angle - gesture.startAngle;
        if (!gesture.type) {
            if (Math.abs(dist - gesture.startDist) < 32 && Math.abs(angleDiff) < 8) {
                return;
            }
            else if (Math.abs(dist - gesture.startDist) > 32) {
                gesture.type = 'scale';
            }
            else {
                gesture.type = 'rotate';
            }
        }
        if (gesture.type === 'scale') {
            var scaleMin = imageState.scaleMin, scaleMax = imageState.scaleMax;
            var scale = gesture.startScale * diff;
            if (diff < 1) {
                imageState.scale = Math.max(scale, scaleMin);
            }
            else {
                imageState.scale = Math.min(scale, scaleMax);
            }
            var startPaddingX = imageState.paddingX;
            imageState.paddingX = (container.offsetWidth - container.offsetWidth / imageState.scale) / 2;
            setTransform(imageState.paddingX - startPaddingX);
        }
        if (gesture.type === 'rotate') {
            var brightMin = imageState.brightMin, brightMax = imageState.brightMax;
            if (Math.abs(angleDiff - gesture.angleDiff) > 300) {
                gesture.startBright = imageState.bright;
                gesture.startAngle = angle;
                gesture.angleDiff = 0;
                return;
            }
            gesture.angleDiff = angleDiff;
            var bright = gesture.startBright + angleDiff / 50;
            if (angleDiff < 0) {
                bright = Math.max(bright, brightMin);
            }
            else {
                bright = Math.min(bright, brightMax);
            }
            imageState.bright = bright;
            image.style.filter = "brightness(" + bright + ")";
            setImageParams('bright', bright);
        }
    }
});
var onPointerUp = function (event) {
    gesture = {
        type: '',
        startDist: 0,
        startScale: 0,
        startBright: 0,
        startAngle: 0,
        angleDiff: 0
    };
    delete currentPointerEvents[event.pointerId];
};
container.addEventListener('pointerup', onPointerUp);
container.addEventListener('pointercancel', onPointerUp);
container.addEventListener('pointerleave', onPointerUp);
