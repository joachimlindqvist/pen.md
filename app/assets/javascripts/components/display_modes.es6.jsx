const DisplayModes = React.createClass({

    render: function() {
        return (
            <span>
                <button onClick={PadActions.mode.bind(PadActions, PadMode.WRITING)}>
                    Write
                </button>
                <button onClick={PadActions.mode.bind(PadActions, PadMode.SPLIT)}>
                    Split
                </button>
                <button onClick={PadActions.mode.bind(PadActions, PadMode.READING)}>
                    Read
                </button>
            </span>
        )
    }
})
