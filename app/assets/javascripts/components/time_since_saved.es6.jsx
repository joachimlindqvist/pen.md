const TimeSinceSaved = React.createClass({

    mixins: [Reflux.connect(DocumentStore, 'document')],

    getInitialState: function() {
        return { seconds: 0 };
    },

    tick: function() {
        this.setState({ seconds: this.state.seconds + 1 });
    },

    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    secondsSinceAsHuman: function() {
        return Time.secondsToHuman(Time.since(this.state.document.updated_at));
    },

    render: function () {

        let text;

        if (this.state.document.updated_at) {
            text = <span>Saved {this.secondsSinceAsHuman()} ago </span>
        }
        else {
            text = <span>Not saved</span>
        }

        return <span>{text}</span>;
    }

});
