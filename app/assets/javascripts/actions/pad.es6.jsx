const PadActions = Reflux.createActions({
    mode: {}
});

PadActions.mode.listen(function(mode) {
    PadStore.mode(mode);
});
