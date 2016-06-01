window.onload = function() {
    var currentClientHeight = document.body.clientHeight;
    setInterval(function() {
        if (currentClientHeight !== document.body.clientHeight) {
            WindowActions.documentSizeChange();
            currentClientHeight = document.body.clientHeight;
        }
    }, 200);
}


// DocumentStore.listen(function(doc) {
//     $('textarea').val(doc.raw);
// });
