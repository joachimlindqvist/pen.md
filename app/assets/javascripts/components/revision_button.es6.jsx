const RevisionButton = React.createClass({

    mixins: [Reflux.connect(DocumentStore, 'document')],

    currentRevisionIsNewest: function() {
        return this.state.document.revisionId !== null
            && this.state.document.revisionId === this.state.document.newestRevisionId;
    },

    render: function() {

        let revisionStyle = {
            fontFamily: 'monospace'
        }

        if (this.state.document.revisionId) {
            var revisionButton = (
                <span style={revisionStyle}>
                    <span>Version: </span>
                    <a href={this.state.document.revisionName}>
                        {this.state.document.revisionName}
                    </a>
                    { (!this.currentRevisionIsNewest()) ? <span> (old)</span> : '' }
                </span>);
        }
        else {
            var revisionButton = (<span style={revisionStyle}>{this.state.document.revisionName}</span>);
        }

        return revisionButton;
    }

});
