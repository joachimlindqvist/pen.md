DocumentStore.listen(function(store) {
    var hash_key = store.hash_key;
    if (hash_key && (!history.state || history.state.hash_key !== hash_key)) {
        history.replaceState({ hash_key: hash_key }, "document", hash_key);
    }
})
