const WritingPad = React.createClass({

    mixins: [Reflux.connect(DocumentStore, 'document')],

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        DocumentActions.subscribe();
    },

    update: function(e) {

        this.stopO = $('textarea')[0].selectionStart;
        this.stop = $('textarea')[0].selectionEnd;

        if (this.startO < this.stop) {
            let chunk = e.target.value.substring(this.startO, this.stop);
            var update = {
                chunk: chunk,
                length: this.start - this.startO,
                position: this.startO,
                type: 'insert'
            }
            DocumentActions.updateRawChunk(update);
        }
        else {
            var update = {
                chunk: null,
                length: this.start - this.stop,
                position: this.stopO,
                type: 'delete'
            }
            DocumentActions.updateRawChunk(update);
        }
    },

    keyDown: function() {
        this.startO = $('textarea')[0].selectionStart;
        this.start = $('textarea')[0].selectionEnd;

        DocumentActions.updateSelection(
            $('textarea')[0].selectionStart,
            $('textarea')[0].selectionEnd
        );
    },

    // componentDidUpdate: function() {
    //     console.log(this.state.document.raw);
    //     // $('textarea')[0].selectionStart = this.startO;
    //     // $('textarea')[0].selectionEnd = this.startO;
    // },

    render: function() {
        let style = { outline: 'none', border: 'none', background: '#fafafa', height: '600px', padding: '15px' };
        // console.log(this.state.document.raw);
        return (
            <div>
                <textarea
                    style={style}
                    className='writing-pad col-xs-12'
                    onKeyDown={this.keyDown}
                    onChange={this.update}
                    value={this.state.document.raw}>
                </textarea>
            </div>
        );
    }
});
