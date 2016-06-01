const Pad = React.createClass({

    mixins: [
        Reflux.connect(DocumentStore, 'document'),
        Reflux.connect(PadStore, 'pad')
    ],

    getInitialState: function() {
        return {};
    },

    componentWillMount: function() {
        if (this.props.document) {
            DocumentActions.initialize(this.props.document);
        }
    },

    onKeyDown: function(e) {
        if (e.keyCode == 83 && modifierKey(e)) {
            e.preventDefault();
            DocumentActions.persist(this.state.document);
        }
    },

    render: function() {
        if (this.state.document.load_error) {
            let style = {
                textAlign: 'center',
                marginTop: '3em',
                fontSize: '3em'
            }
            return <div style={style}>{this.state.document.load_error.error}</div>
        }
        if (this.state.pad.mode === PadMode.SPLIT) {
            return (
                <div className='row pad-split' onKeyDown={this.onKeyDown}>
                    <div className='col-xs-6'>
                        <WritingPad defaultValue={this.props.document.raw} />
                    </div>
                    <div className='col-xs-6'>
                        <RenderPad />
                    </div>
                </div>
            );
        }
        else if (this.state.pad.mode === PadMode.WRITING) {
            return (
                <div className='row pad-solo' onKeyDown={this.onKeyDown}>
                    <div className='col-xs-8'>
                        <WritingPad defaultValue={this.props.document.raw} />
                    </div>
                </div>
            );
        }
        else if (this.state.pad.mode === PadMode.READING) {
            return (
                <div className='row pad-solo' onKeyDown={this.onKeyDown}>
                    <div className='col-xs-8'>
                        <RenderPad />
                    </div>
                </div>
            );
        }
    }
});
