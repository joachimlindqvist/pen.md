const RenderPad = React.createClass({

    mixins: [Reflux.connect(DocumentStore, 'document')],

    componentWillMount: function() {
        if (this.props.document) {
            // DocumentActions.initialize(this.props.document);
        }
        if (this.props.subscribe) {
            DocumentActions.subscribe();
        }
    },

    render: function() {
        return (
            <div>
                <div
                    className='render-pad'
                    dangerouslySetInnerHTML={{ __html: this.state.document.markdown }}>
                </div>
            </div>
        );
    }

});
