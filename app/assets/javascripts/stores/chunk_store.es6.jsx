const ChunkStore = Reflux.createStore({

    listenables: [ChunkActions],

    store: {},

    add: function(chunk) {
        // buggpotential. det finns risk att två förändringar har samma time
        chunk = Object.assign({}, chunk);
        delete chunk.store_identifier;
        this.store[chunk.time] = chunk;
    }

});
