@Channel ||= {}
@Channel.createDocumentChannel = (hash_key, store_identifier) ->
    App.cable.subscriptions.create { 'channel': 'DocumentChannel', 'hash_key': hash_key, 'store_identifier': store_identifier },
        connected: ->
            # Called when the subscription is ready for use on the server

        disconnected: ->
            # Called when the subscription has been terminated by the server

        received: (response) ->
            switch response.action
                when 'chunk'
                    DocumentActions.updateWithChunk(response)
                    break
                when 'commit'
                    DocumentActions.meta(response)
                    break

        chunk: (chunk) ->
            @perform 'chunk', chunk

        commit: (document) ->
            @perform 'commit', document
