class DocumentChunkBroadcastJob < ApplicationJob
    queue_as :default

    def perform(chunk)
        hash_key = chunk['hash_key']
        puts chunk
        ActionCable.server.broadcast "document_channel_#{hash_key}", chunk
    end

end
