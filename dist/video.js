/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shri_2018_flux_js_Dispatcher__ = __webpack_require__(3);


/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__shri_2018_flux_js_Dispatcher__["a" /* default */]());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flux_Actions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flux_VideoStore__ = __webpack_require__(4);



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

// Применение Flux
__WEBPACK_IMPORTED_MODULE_1__flux_VideoStore__["a" /* default */].subscribe(onChangeFilter);

// Изменение яркости и контрастности
for (let i = 0; i < allVideos.length; i++) {
    // Яркость
    document.querySelector(`#video-${i + 1}__bright`).addEventListener('input', (e) => {
        __WEBPACK_IMPORTED_MODULE_0__flux_Actions__["a" /* default */].setBright({
            video: i,
            value: e.target.value
        });
    });

    // Контрастность
    document.querySelector(`#video-${i + 1}__contrast`).addEventListener('input', (e) => {
        __WEBPACK_IMPORTED_MODULE_0__flux_Actions__["a" /* default */].setContrast({
            video: i,
            value: e.target.value
        });
    });
}

function onChangeFilter(data) {
    for(let key in data) {
        const bright = data[key].bright;
        const contrast = data[key].contrast;
        allVideos[key].style.filter = `brightness(${bright || 100}%) contrast(${contrast || 100}%)`;
    }
}

//----------------------------------

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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VideoDispatcher__ = __webpack_require__(0);


class Actions {
    /**
     * Dispatch action
     * @param {Object} data 
     */
    setBright(data) {
        __WEBPACK_IMPORTED_MODULE_0__VideoDispatcher__["a" /* default */].dispatch({
            type: 'SET_BRIGHT',
            data: data
        });
        console.log('Action SET_BRIGHT was called');
    }

    /**
     * Dispatch action
     * @param {Object} data 
     */
    setContrast(data) {
        __WEBPACK_IMPORTED_MODULE_0__VideoDispatcher__["a" /* default */].dispatch({
            type: 'SET_CONTRAST',
            data: data
        });
        console.log('Action SET_CONTRAST was called');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (new Actions());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Class Dispather registers Stores and dispatches actions
 */
class Dispatcher {
    constructor() {
        this.callbacks = [];
    }

    /**
     * Register a callback
     * @param {Function} callback 
     */
    register(callback) {
        this.callbacks.push(callback);
        console.log('Dispatcher registered callback');
    }

    /**
     * Dispatches action to registered callbacks
     * @param {Object} action 
     */
    dispatch(action) {
        this.callbacks.forEach(callback => {
            callback(action);
        });
        console.log('Dispatcher dispatched action');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dispatcher;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shri_2018_flux_js_Store__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VideoDispatcher__ = __webpack_require__(0);



class VideoStore extends __WEBPACK_IMPORTED_MODULE_0__shri_2018_flux_js_Store__["a" /* default */] {
    constructor(dispatcher) {
        super(dispatcher);
        this.state = {};
    }

    /**
     * Callback for dispetcher
     * @param {Object} action 
     */
    actionToRegister(action) {
        switch(action.type) {
            case 'SET_BRIGHT': {
                if(this.state[action.data.video]) {
                    this.state[action.data.video].bright = action.data.value;
                } else {
                    this.state[action.data.video] = {};
                    this.state[action.data.video].bright = action.data.value;
                }
                this.notify(this.state);

                console.log('Store was changed');
                break;
            }
            case 'SET_CONTRAST': {
                if(this.state[action.data.video]) {
                    this.state[action.data.video].contrast = action.data.value;
                } else {
                    this.state[action.data.video] = {};
                    this.state[action.data.video].contrast = action.data.value;
                }
                this.notify();

                console.log('Store was changed');
                break;
            }
            default: break;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (new VideoStore(__WEBPACK_IMPORTED_MODULE_1__VideoDispatcher__["a" /* default */]));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Store contain data and notify when it changes
 */
class Store {
    constructor(dispatcher) {
        this.listeners = [];
        dispatcher.register(this.actionToRegister.bind(this));
    }

    /**
     * Abstract method
     */
    actionToRegister(action) {}

    /**
     * Return current state
     */
    getState() {
        console.log('Store returned state');
        return this.state;
    }

    /**
     * Subscription to Store changes
     * @param {Function} listener
     */
    subscribe(listener) {
        this.listeners.push(listener);
        console.log('Listener was subscribed');
    }

    /**
     * Cancel subscription to Store changes
     * @param {Function} listener
     */
    unsubscribe(listener) {
        this.listeners = this.listeners.filter(item => {
            item !== listener
        });
        console.log('Listener was unsubscribed');
    }

    /**
     * Notify listeners about Store changes
     * @param {typeof State} data
     */
    notify() {
        this.listeners.forEach(item => {
            item(this.state);
        });
        console.log('Listeners were notifyed');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ })
/******/ ]);