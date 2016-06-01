
var test = function() {

    var chunks = {
        // user 1
        1: { chunk: '1', position: 0, length: 0, time: 1, type: 'insert' },
        3: { chunk: '3', position: 1, length: 0, time: 3, type: 'insert' },
        4: { chunk: '4', position: 2, length: 0, time: 4, type: 'insert' },
        //user 2
        2: { chunk: 'POK', position: 1, length: 2, time: 2, type: 'insert' },
    };
    // raw = 9876
    // user 1 = 134
    // user 2 = 12
    //
    // steps
    // #1 = 9876
    // #2 = 19876
    // #3 = 1POK76
    // #4 = 1POK376
    // #5 = 1POK3476
    // res = 1POK3476

    // chunk.2 kommer att skjutas in efter chunk.1 och före chunk.3
    // eftersom chunk.3 och chunk.4 har time högre än chunk.2
    //
    // if position == chunk.2.position
    //      ska justeras med chunk.2.length
    // if position > chunk.2.position
    //      ska justeras med

    // chunk.3.position = chunk.2.position + chunk.2.chunk.length

    var chunkOrder = [1, 3, 4, 2];

    var adjustChunks = function(order) {
        var correct = [];
        for (var i = 0; i < order.length; i++) {

            var lowest = Math.min.apply(null, order.slice(i));
            var higher = higherChunks(lowest, order.slice(i));

            var newOrder = moveChunk(order, i, lowest);
            if (Arr.equal(order, newOrder) === false) {
                compensateForChunk(lowest, higher);
                order = newOrder;
            }
        }
    }

    var moveChunk = function(order, moveTo, chunk) {
        var newOrder = order.slice(moveTo);
        newOrder.splice(newOrder.indexOf(chunk), 1);
        newOrder.unshift(chunk);
        return order.slice(0, moveTo).concat(newOrder);
    }

    var higherChunks = function(lowest, chunks) {
        return chunks.filter(function(chunk) {
            return chunk > lowest;
        });
    }

    var compensateForChunk = function(chunk, higher) {
        higher.forEach(function(i) {
            chunks[i].position = chunks[chunk].position + chunks[chunk].chunk.length;
        });
    }

    adjustChunks(chunkOrder);

    // DocumentStore.listen(function(doc) {
    //     console.log(DocumentStore.reapplyChunksInCorrectOrder());
    // });
    //
    // DocumentActions.initialize({
    //     chunks: chunks,
    //     chunk_order: chunkOrder,
    //     original_raw: '9876',
    //     raw: ''
    // });
}
