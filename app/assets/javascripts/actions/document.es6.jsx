const DocumentActions = Reflux.createActions({
    persist: { children: ['completed', 'failed'] },
    load: { children: ['completed', 'failed'] },
    updateRaw: {},
    updateRawChunk: { sync: true },
    updateWithChunk: {},
    reapplyChunksInCorrectOrder: {},
    addChunk: {},
    applyChunk: {},
    initialize: {},
    meta: {},
    subscribe: {},
    updateSelection: {},
    setTimeDiff: {}
});

DocumentActions.load.listenAndPromise(function(hash_key) {
    return $.get('/load', { hash_key: hash_key });
});
