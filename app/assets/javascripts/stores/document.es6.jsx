const DocumentStore = Reflux.createStore({

    listenables: [DocumentActions],

    store: {
        chunks: {},
        chunk_order: [],
        original_raw: null,
        verified_raw: '',
        raw: '',
        markdown: '',
        selection: {},
        hash_key: null,
        created_at: null,
        updated_at: null,
        load_error: null,
        time_diff: 0,
    },

    // To prevent this store to act on web socket frames
    // triggered by this store.
    storeIdentifier: Str.random(12),

    persistLazilyMs: 5000,

    getInitialState: function() {
        return this.store;
    },

    renderMarkdown: function() {
        this.store.markdown = marked(this.store.raw, { sanitize: true });
    },

    assign: function(document) {

        this.store = Object.assign(this.store, document);
        this.store.verified_raw = this.store.raw;
        this.renderMarkdown();

        if (this.store.original_raw === null) {
            this.store.original_raw = this.store.raw;
        }

        this.trigger(this.store);
    },

    initialize: function(document) {
        this.assign(document);
    },

    meta: function(document) {
        this.store.hash_key = document.hash_key;
        this.store.created_at = document.created_at;
        this.store.updated_at = document.updated_at;
        this.trigger(this.store);
    },

    onLoad: function() {
        console.log('loading');
    },

    onLoadAsyncCompleted: function(document) {
        this.assign(document);
        console.log('loading done');
    },

    onLoadCompleted: function(document) {
        this.assign(document);
        console.log('loading done');
    },

    onLoadFailed: function(response) {
        this.store.load_error = response.responseJSON;
        this.trigger(this.store);
        console.log('loading done');
    },

    persistLazily: function() {
        if (this.persistLazilyTimeout) {
            clearTimeout(this.persistLazilyTimeout);
        }
        this.persistLazilyTimeout = setTimeout(
            this.persist.bind(this, this.store), this.persistLazilyMs
        );
    },

    persist: function(document) {
        if (this.channel) {
            this.channel.commit({
                hash_key: document.hash_key,
                raw: document.raw
            });
        }
        else {
            $.post('/document/save', { raw: document.raw })
                .done(this.initialize)
                .done(this.subscribe);
        }
    },

    onPersistCompleted: function(document) {
        this.assign(document);
    },

    chunksAreCorrectlyOrdered: function() {
        let sortable = this.store.chunk_order.slice();
        return Arr.equal(this.store.chunk_order, Arr.sort(sortable));
    },

    updateVerifiedRaw: function(verfifiedRaw) {
        this.store.verified_raw = verfifiedRaw;
    },

    updateRaw: function(raw) {
        this.store.raw = raw;
        this.renderMarkdown();
        this.trigger(this.store);
    },

    updateRawChunk: function(chunk) {

        var raw = '';
        // update.order = this.store.chunk_order[this.store.chunk_order.length - 1];
        chunk.time = (new Date()).getTime() + this.store.time_diff;
        this.addChunk(chunk);

        // if (this.chunksAreCorrectlyOrdered()) {
            raw = this.applyChunk(this.store.raw, chunk);
        // }
        // else {
        //     raw = this.reapplyChunksInCorrectOrder();
        // }

        this.updateRaw(raw);

        if (this.channel) {
            this.channel.chunk(chunk);
        }
    },

    updateWithChunk: function(update) {

        if (update.store_identifier === this.storeIdentifier) {
            return false;
        }

        let raw = false;
        this.addChunk(update);

        console.log('correctly sorted?', this.chunksAreCorrectlyOrdered());

        if (this.chunksAreCorrectlyOrdered()) {
            // console.log(this.store.verified_raw);
            raw = this.applyChunk(this.store.raw, update);
        }
        else {
            raw = this.reapplyChunksInCorrectOrder();
        }

        this.updateVerifiedRaw(raw);

        if (this.store.raw !== raw) {
            console.log('updating raw');
            this.updateRaw(raw);
        }

        if (this.storeIdentifier === update.store_identifier) {
            this.persistLazily();
        }
    },

    addChunk: function(chunk) {

        chunk = Object.assign({}, chunk);
        let chunkId = this.getChunkId(chunk);

        if (this.store.chunk_order.indexOf(chunkId) === -1) {
            console.log(chunkId);
            this.store.chunk_order.push(chunkId);
            delete chunk.store_identifier;
            this.store.chunks[chunkId] = chunk;
        }
    },

    getChunkId: function(chunk) {
        return parseInt(chunk.time);// + this.store.time_diff;
    },

    applyChunk: function(raw, update) {

        // if (this.storeIdentifier === update.store_identifier) {
        //     console.log('Chunk not resolved for ' + this.storeIdentifier);
        //     return false;
        // }

        if (update.type === 'insert') {
            let beginning = raw.substr(0, update.position);
            let end = raw.substr(update.position + update.length);
            return [beginning, update.chunk, end].join('');
        }
        else {
            let beginning = raw.substr(0, update.position);
            let end = raw.substr(update.position + update.length);
            return [beginning, end].join('');
        }
    },

    reapplyChunksInCorrectOrder: function() {

        // let reorderFromValue = Arr.lastCorrectlyOrderedElement(this.store.chunk_order);
        // let reorderFromIndex = this.store.chunk_order.indexOf(reorderFromValue);
        //
        // this.store.chunk_order.sort();
        // let rest = this.store.chunk_order.splice(reorderFromIndex);
        // console.log(reorderFromIndex);
        this.correctChunkOrder();
        // console.log('after correction: ', this.store.chunk_order);
        var o = this.store.chunk_order.reduce(function(raw, chunkId) {
            return this.applyChunk(raw, this.store.chunks[chunkId]);
        }.bind(this), this.store.original_raw);
        // console.log('new raw:', o);
        return o;
    },

    correctChunkOrder: function() {
        var o = 0;
        for (var i = 0; i < this.store.chunk_order.length; i++) {

            let order = this.store.chunk_order;
            let lowest = Math.min.apply(null, order.slice(i));
            let higher = this.higherChunks(lowest, order.slice(i));
            let newOrder = this.moveChunk(order, i, lowest);
            console.log(higher, newOrder);
            if (Arr.equal(order, newOrder) === false) {
                this.compensateForChunk(lowest, higher);
                this.store.chunk_order = newOrder;
            }
            o++;
        }
        // console.log(o);
    },

    moveChunk: function(order, moveTo, chunk) {
        var newOrder = order.slice(moveTo);
        newOrder.splice(newOrder.indexOf(chunk), 1);
        newOrder.unshift(chunk);
        // console.log('slice:', order.slice(0, moveTo));
        // console.log('concat:', (newOrder));
        // console.log('res:', order.slice(0, moveTo).concat(newOrder));
        return order.slice(0, moveTo).concat(newOrder);
    },

    higherChunks: function(lowest, chunks) {
        return chunks.filter(function(chunk) {
            return chunk > lowest;
        });
    },

    compensateForChunk: function(chunk, higher) {
        higher.forEach(function(i) {
            let diff = this.store.chunks[i].position - this.store.chunks[chunk].position;
            let newPos = this.store.chunks[chunk].position + this.store.chunks[chunk].chunk.length;
            this.store.chunks[i].position = diff + newPos;
        }.bind(this));
    },

    updateSelection: function(start, end) {
        this.store.selection = {
            start: parseInt(start),
            end: parseInt(end)
        };
    },

    subscribe: function() {
        console.log('subscribe')
        if (this.store.hash_key) { // todo: ändra
            console.log('subscribe1');
            this.channel = Channel.createDocumentChannel(
                this.store.hash_key, this.storeIdentifier
            );
        }
    },

    setTimeDiff: function(timeDiff) {
        this.store.time_diff = timeDiff;
    },

    // saveChunk: function() {
    //     if (this.store.hash_key) {
    //         return this.channel().save(this.store);
    //     }
    // },
    //
    // channel: function() {
    //     this._channel = this._channel || ;
    //     return this._channel;
    // }

});
