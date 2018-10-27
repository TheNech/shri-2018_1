function initVideo(video: HTMLVideoElement, url: string) {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}

initVideo(
    document.querySelector<HTMLVideoElement>('#video-1'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
);

initVideo(
    document.querySelector<HTMLVideoElement>('#video-2'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
);

initVideo(
    document.querySelector<HTMLVideoElement>('#video-3'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
);

initVideo(
    document.querySelector<HTMLVideoElement>('#video-4'),
    'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
);


const allVideos = document.querySelectorAll<HTMLVideoElement>('video');

// Анализатор звука
declare interface Window {
    AudioContext: AudioContext,
}

const ctx: AudioContext = window.AudioContext; // проверить
const analyser = ctx.createAnalyser();
const processor = ctx.createScriptProcessor(2048, 1, 1);
let data = new Uint8Array(analyser.frequencyBinCount);
analyser.fftSize = 512;
analyser.connect(ctx.destination);
processor.connect(ctx.destination);

// Позволяет индексировать поля объекта sourcesStore
interface ISourcesStoreStringArray {
    [index: string]: MediaElementAudioSourceNode;
}

let sourcesStore: ISourcesStoreStringArray = {};
allVideos.forEach(element => {
    sourcesStore[element.id] = ctx.createMediaElementSource(element);
});

let isVideo = false;
let video: HTMLVideoElement;
let source;

processor.addEventListener('audioprocess', () => {
    analyser.getByteFrequencyData(data);

    if(isVideo) {
        video.parentElement.querySelector<HTMLElement>('.volume__line').style.width = getAverageValue(data) + 'px';
    }
});

function getAverageValue(numArray: number[] | Uint8Array) {
    let value = 0;
    for(let i = 0; i < numArray.length; i++) {
        value += numArray[i];
    }
    return value / numArray.length;
}

// Развертывание видео
allVideos.forEach((element: HTMLVideoElement) => {
    element.addEventListener('click', (e: MouseEvent) => {
        const mainBlock = document.querySelector('main');
        const mainBlockStyle = getComputedStyle(mainBlock, null);
        const mainHeight = parseInt(mainBlockStyle.getPropertyValue('height'));

        const parrent = (<HTMLVideoElement>e.target).parentElement;
        
        parrent.style.height = mainHeight + 'px';
        parrent.classList.add('video__full');

        (<HTMLVideoElement>e.target).muted = false;

        video = <HTMLVideoElement>e.target;
        source = sourcesStore[(<HTMLVideoElement>e.target).id];
        source.connect(analyser);
        source.connect(processor);
    });
});

// Изменение яркости
for (let i = 0; i < allVideos.length; i++) {
    const brightInput = document.querySelector<HTMLInputElement>(`#video-${i + 1}__bright`);
    brightInput.addEventListener('input', (e) => {
        const contrast: string = document.querySelector<HTMLInputElement>(`#video-${i + 1}__contrast`).value;
        changeFilter(allVideos[i], (<HTMLInputElement>e.target).value, contrast);
    });
}

// Измнение контрастности
for (let i = 0; i < allVideos.length; i++) {
    const contrastInput = document.querySelector<HTMLInputElement>(`#video-${i + 1}__contrast`);
    contrastInput.addEventListener('input', (e) => {
        const bright: string = document.querySelector<HTMLInputElement>(`#video-${i + 1}__bright`).value;
        changeFilter(allVideos[i], bright, (<HTMLInputElement>e.target).value);
    });
}

function changeFilter(el: HTMLVideoElement, bright: string, contrast: string) {
    el.style.filter = `brightness(${bright}%) contrast(${contrast}%)`;
}

// Обработка кнопки возврата к превью
const buttonsBack = document.querySelectorAll<HTMLButtonElement>('.video__back');
buttonsBack.forEach((element) => {
    element.addEventListener('click', (e) => {
        const parrent = (<HTMLElement>e.target).parentElement;
        parrent.classList.remove('video__full');
        parrent.style.height = '';
        parrent.querySelector('video').muted = true;
    })
});
