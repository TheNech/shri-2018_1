function initVideo(video, url) {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
initVideo(document.querySelector('#video-1'), 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8');
initVideo(document.querySelector('#video-2'), 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8');
initVideo(document.querySelector('#video-3'), 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8');
initVideo(document.querySelector('#video-4'), 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8');
const allVideos = document.querySelectorAll('video');
const contextClass = window.AudioContext || window.webkitAudioContext;
const ctx = new contextClass();
// const ctx = new(window.AudioContext)();
// const ctx: AudioContext = window.AudioContext; // проверить
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
let isVideo = false;
let video;
let source;
processor.addEventListener('audioprocess', () => {
    analyser.getByteFrequencyData(data);
    if (isVideo) {
        video.parentElement.querySelector('.volume__line').style.width = getAverageValue(data) + 'px';
    }
});
function getAverageValue(numArray) {
    let value = 0;
    for (let i = 0; i < numArray.length; i++) {
        value += numArray[i];
    }
    value = Math.round(value / numArray.length);
    return value;
}
// Развертывание видео
allVideos.forEach((element) => {
    element.addEventListener('click', (e) => {
        const mainBlock = document.querySelector('main');
        const mainBlockStyle = getComputedStyle(mainBlock, null);
        const mainHeight = parseInt(mainBlockStyle.getPropertyValue('height'));
        const parrent = e.target.parentElement;
        parrent.style.height = mainHeight + 'px';
        parrent.classList.add('video__full');
        e.target.muted = false;
        isVideo = true;
        video = e.target;
        source = sourcesStore[e.target.id];
        source.connect(analyser);
        source.connect(processor);
    });
});
// Изменение яркости
for (let i = 0; i < allVideos.length; i++) {
    const brightInput = document.querySelector(`#video-${i + 1}__bright`);
    brightInput.addEventListener('input', (e) => {
        const contrast = document.querySelector(`#video-${i + 1}__contrast`).value;
        changeFilter(allVideos[i], e.target.value, contrast);
    });
}
// Измнение контрастности
for (let i = 0; i < allVideos.length; i++) {
    const contrastInput = document.querySelector(`#video-${i + 1}__contrast`);
    contrastInput.addEventListener('input', (e) => {
        const bright = document.querySelector(`#video-${i + 1}__bright`).value;
        changeFilter(allVideos[i], bright, e.target.value);
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
        parrent.style.height = '';
        parrent.querySelector('video').muted = true;
    });
});
