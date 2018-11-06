import Dispatcher from './VideoDispatcher';

class Actions {
    /**
     * Dispatch action
     * @param {Object} data 
     */
    setBright(data) {
        Dispatcher.dispatch({
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
        Dispatcher.dispatch({
            type: 'SET_CONTRAST',
            data: data
        });
        console.log('Action SET_CONTRAST was called');
    }
}

export default Actions;
