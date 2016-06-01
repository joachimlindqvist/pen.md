# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class DocumentChannel < ApplicationCable::Channel
    def subscribed
        stream_from "document_channel_#{params[:hash_key]}"
    end

    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
    end

    def chunk(update)

        # Document.safe_chunk_update( hash_key: params[:hash_key],
        #                             update: update )

        update['hash_key'] = params[:hash_key]
        update['store_identifier'] = params[:store_identifier]
        # update['time'] = DateTime.now.strftime('%Q').to_i
        DocumentChunkBroadcastJob.perform_later(update)
    end

    def commit(document_data)

        document = Document.find(document_data['hash_key'])
        document.raw = document_data['raw']
        document.save

        document_hash = document.reload.serializable
        document_hash['action'] = document_data['action']
        document_hash['store_identifier'] = params[:store_identifier]
        DocumentCommitBroadcastJob.perform_later(document_hash)
    end
end
