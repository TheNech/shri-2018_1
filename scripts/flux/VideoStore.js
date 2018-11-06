import { Store } from '../shri-2018-flux/js/Store';
import dispatcher from './VideoDispatcher';

class VideoStore extends Store {
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

export default new VideoStore(dispatcher);
