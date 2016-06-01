const PadMode = {
    WRITING: 0,
    SPLIT: 1,
    READING: 2
}

const PadStore = Reflux.createStore({

    listenables: [],

    store: {
        mode: PadMode.SPLIT
    },

    getInitialState: function() {
        return this.store;
    },

    mode: function(mode) {
        this.store.mode = mode;
        this.trigger(this.store);
    }

});
