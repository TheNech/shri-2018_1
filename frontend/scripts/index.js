const container = document.querySelector('#touch-container');
const img = document.querySelector('#touch-img');
const zoomText = document.querySelector('#img-zoom');

let currentGesture = {};
let currentScale = 1.2;
let containerWidth = container.offsetWidth;
let paddingX = (containerWidth - containerWidth / currentScale) / 2;
let currentX = 0;
let dx;
let distance = 0;

let move = false;

container.addEventListener('pointerdown', (event) => {
    
    // Нужно для десктопа чтобы поймать pointerup вне DOM-ноды
    container.setPointerCapture(event.pointerId);

    currentGesture[event.pointerId] = {
        startX: event.x,
        startY: event.y
    }

    if(Object.keys(currentGesture).length == 2) {
        distance = calcDistance();
    }
});

container.addEventListener('pointermove', (event) => {
    if (currentGesture === {}) {
        return
    }

    if(Object.keys(currentGesture).length == 1) {
        for (let key in currentGesture) {

            const startX = currentGesture[key].startX;
            const { x } = event;
            dx = x - startX;

            if(Math.abs(currentX + dx) < paddingX ) {
                img.style.transform = `scale(${currentScale}) translateX(${currentX + dx}px)`;
                move = true;
            }
        }
    }

    if(Object.keys(currentGesture).length == 2) {
        let prevDist = distance;

        currentGesture[event.pointerId] = {
            startX: event.x,
            startY: event.y
        }

        distance = calcDistance();
        let scaleDiff = distance / prevDist;

        if(currentScale * scaleDiff > 1.2) {
            currentScale *= scaleDiff;
            paddingX = (containerWidth - containerWidth / currentScale) / 2;
        } else {
            currentScale = 1.2;
            currentX = 0;
        }
        if(scaleDiff < 1 && currentScale > 1.2) {
            currentX *= scaleDiff;
        }

        img.style.transform = `scale(${currentScale}) translateX(${currentX}px)`;

        zoomText.innerHTML = `Приближение: ${Math.round(currentScale * 100)}%`
    }

});

container.addEventListener('pointerup', (event) => {
    if(move) {
        currentX += dx;
        move = false;
    }
    
    delete currentGesture[event.pointerId];
});

container.addEventListener('pointercancel', () => {
    currentGesture = {};
});

function calcDistance() {
    let points = [];

    for(let key in currentGesture) {
        points.push(currentGesture[key]);
    }

    let powX = Math.pow(points[0].startX - points[1].startX, 2);
    let powY = Math.pow(points[0].startY - points[1].startY, 2);

    return Math.sqrt(powX + powY);
}
