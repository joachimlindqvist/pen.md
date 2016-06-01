const Toolbar = React.createClass({

    mixins: [Reflux.connect(DocumentStore, 'document')],

    persist: function(e) {
        DocumentActions.persist(this.state.document);
    },

    gotoPresentation: function(e) {
        window.location = '/present/' + this.state.document.hash_key;
    },

    render: function() {

        let style = {
            background: '#fff',
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            lineHeight: '2em',
            height: '4em',
            boxSizing: 'border-box',
            padding: '1em 1em'
        }

        if (!this.state.document.load_error) {
            return (
                <div style={style}>
                    <button onClick={this.persist}>Save</button>
                    <button>Download</button>
                    <button onClick={this.gotoPresentation}>Presention</button>
                    <RevisionButton />
                    <DisplayModes />
                    <TimeSinceSaved />
                </div>
            )
        }
        else {
            return <span></span>;
        }
    }
});
