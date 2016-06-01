class DocumentCommitBroadcastJob < ApplicationJob
    queue_as :default

    def perform(document)
        hash_key = document['hash_key']
        ActionCable.server.broadcast "document_channel_#{hash_key}", document
    end

end
