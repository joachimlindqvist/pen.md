const NewestRevisionButton = React.createClass({
    render: function() {

        let revisionStyle = {
            fontFamily: 'monospace'
        }

        return (
            <span style={revisionStyle}>Newest version: <a href>(Dke987F2dF)</a></span>
        )
    }
});
