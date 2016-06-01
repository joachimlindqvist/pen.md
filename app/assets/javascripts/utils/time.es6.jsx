const Time = {

    formattingTable: [
        { max: 60, resolution: 1, singular: 'second', plural: 'seconds' },
        { max: 3600, resolution: 60, singular: 'minute', plural: 'minutes' },
        { max: 86400, resolution: 3600, singular: 'hour', plural: 'hours' },
        { max: 604800, resolution: 86400, singular: 'day', plural: 'days' },
        { max: 2592000, resolution: 604800, singular: 'week', plural: 'weeks' },
        { max: 31536000, resolution: 2592000, singular: 'month', plural: 'months' },
        { max: Infinity, resolution: 31536000, singular: 'year', plural: 'years' }
    ],

    since: function(since) {

        if (!since) {
            return null;
        }

        let now = new Date().getTime();
        since = new Date(since).getTime();

        return Math.round((now - since) / 1000);
    },

    secondsToHuman: function(seconds) {
        let format = this.appropriateFormat(seconds);
        let count = Math.floor(seconds / format.resolution);
        let unit = count === 1 ? format.singular : format.plural;
        return count + ' ' + unit;
    },

    appropriateFormat: function(seconds) {

        let appropriateFormat = null;

        for (let i = 0; i < this.formattingTable.length; i++) {
            if (seconds < this.formattingTable[i].max) {
                appropriateFormat = this.formattingTable[i];
                break;
            }
        }

        return appropriateFormat;
    },
}

var clientStartTimestamp = (new Date()).getTime();
console.log('req start: ', clientStartTimestamp);
$.get('/time?timestamp=' + clientStartTimestamp).done(function(resp) {

    var entries = window.performance.getEntries();
    var entry = entries[entries.length - 1];

    var clientStopTimestamp = (new Date()).getTime();
    var oneTrip = (clientStopTimestamp - clientStartTimestamp) / 2;
    var serverTime = parseInt(resp.time + oneTrip);
    DocumentActions.setTimeDiff(serverTime - (new Date()).getTime());
    // var serverClientRequestDiffTime = resp.diff;
    // var serverTimestamp = resp.time;
    // var serverClientResponseDiffTime = clientStopTimestamp - serverTimestamp;
    //
    // var responseTime = (serverClientRequestDiffTime - clientStopTimestamp + clientStartTimestamp - serverClientResponseDiffTime )/2
    // var responseTime = (clientStartTimestamp - clientStopTimestamp + serverClientRequestDiffTime - serverClientResponseDiffTime )/2
    //
    // var syncedServerTime = (new Date()).getTime() + (serverClientResponseDiffTime - responseTime);
    // console.log(entry);
    // console.log('req stop: ', clientTime);
    // console.log('client/server diff: ', resp.diff);
    // console.log('server/client diff: ', clientTime - resp.time);
    // console.log('server time: ', resp.time);
    // console.log('download', entry.responseEnd - entry.responseStart);

    // console.log(entry);
});
