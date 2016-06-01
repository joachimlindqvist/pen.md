const Str = {
    random: function(length) {
        var alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
        return (Array.apply(null, Array(length))).map(function() {
            var index = Math.floor(Math.random() * alphanumeric.length);
            return alphanumeric[index];
        }).join('');
    }
}
