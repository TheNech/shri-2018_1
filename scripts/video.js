function initVideo(video, url) {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}

initVideo(
    document.getElementById('video-1'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
);

initVideo(
    document.getElementById('video-2'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
);

initVideo(
    document.getElementById('video-3'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
);

initVideo(
    document.getElementById('video-4'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
);


const allVideos = document.querySelectorAll('video');

// Анализатор звука
const ctx = new(window.AudioContext || window.webkitAudioContext)();
const analyser = ctx.createAnalyser();
const processor = ctx.createScriptProcessor(2048, 1, 1);
let data = new Uint8Array(analyser.frequencyBinCount);
analyser.fftSize = 512;
analyser.connect(ctx.destination);
processor.connect(ctx.destination);

let sourcesStore = {};
allVideos.forEach(element => {
    sourcesStore[element.id] = ctx.createMediaElementSource(element);
});

let video = null;
let source;

processor.addEventListener('audioprocess', () => {
    analyser.getByteFrequencyData(data);

    if(video) {
        video.parentElement.querySelector('.volume__line').style.width = getMaxOfArray(data) + 'px';
    }
});

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

// Развертывание видео
allVideos.forEach((element) => {
    element.addEventListener('click', (e) => {
        document.querySelector('main > h2').style.display = 'none';

        const mainBlock = document.querySelector('main');
        const mainBlockStyle = getComputedStyle(mainBlock, null);
        const mainHeight = parseInt(mainBlockStyle.getPropertyValue('height'));
        const mainWidth = parseInt(mainBlockStyle.getPropertyValue('width'));

        const parrent = e.target.parentElement;
        
        parrent.style.height = mainHeight + 'px';
        parrent.classList.add('video__full');

        // Попытка сделать анимацию

        // const dh = mainHeight / 30;
        // const dw = mainWidth / 30;
        // let parHeight = 0;
        // let parWidth = 0;

        // parrent.classList.add('video__open');
        // parrent.style.left = e.x + 'px';
        // const timer = setInterval(() => {
        //     if(parHeight >= 0.97 * mainHeight) {
        //         parrent.style.height = mainHeight + 'px';
        //         parrent.style.width = mainWidth + 'px';
        //         parrent.classList.add('video__full');
        //         clearInterval(timer);
        //     } else {
        //         parHeight += dh;
        //         parWidth += dw;
        //         parrent.style.height = parHeight + 'px';
        //         parrent.style.width = parWidth + 'px';
        //     }

        // }, 1000 / 60);


        e.target.muted = false;

        video = e.target;
        source = sourcesStore[e.target.id];
        source.connect(analyser);
        source.connect(processor);
    });
});

// Изменение яркости
for (let i = 0; i < allVideos.length; i++) {
    document.querySelector(`#video-${i + 1}__bright`).addEventListener('input', (e) => {
        let videoContrast = document.querySelector(`#video-${i + 1}__contrast`).value;
        changeFilter(allVideos[i], e.target.value, videoContrast);
    });
}

// Измнение контрастности
for (let i = 0; i < allVideos.length; i++) {
    document.querySelector(`#video-${i + 1}__contrast`).addEventListener('input', (e) => {
        let videoBright = document.querySelector(`#video-${i + 1}__bright`).value;
        changeFilter(allVideos[i], videoBright, e.target.value);
    });
}

function changeFilter(el, bright, contrast) {
    el.style.filter = `brightness(${bright}%) contrast(${contrast}%)`;
}

// Обработка кнопки возврата к превью
const buttonsBack = document.querySelectorAll('.video__back');
buttonsBack.forEach((element) => {
    element.addEventListener('click', (e) => {
        const parrent = e.target.parentElement;
        parrent.classList.remove('video__full');
        parrent.classList.remove('video__open');
        parrent.style.height = '';
        parrent.style.width = '';
        parrent.querySelector('video').muted = true;
        document.querySelector('main > h2').style.display = 'block';
    })
});
