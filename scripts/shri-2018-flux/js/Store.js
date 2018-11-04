/**
 * Store contain data and notify when it changes
 */
export default class Store {
    constructor(state, dispatcher) {
        this.state = state;
        dispatcher.register(actionToRegister);
    }

    /**
     * Abstract method
     */
    actionToRegister() {}

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
    notify(data) {
        this.listeners.forEach(item => {
            item(data);
        });
        console.log('Listeners were notifyed');
    }
}
