const WindowStore = Reflux.createStore({

    listenables: [WindowActions],

    store: {
        clientHeight: 0,
        clientWidth: 0
    },

    getInitialState: function() {
        return this.store;
    },

    onDocumentSizeChange: function() {
        this.store.clientHeight = document.body.clientHeight;
        this.store.clientWidth = document.body.clientWidth;
        this.trigger(this.store);
        console.log(this.store);
    }

});
