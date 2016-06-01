class DocumentController < ApplicationController

    def save

        document = Document.create({ raw: params[:raw] })
        # if params[:hash_key].length > 0
        #     document = Document.find(params[:hash_key])
        #     # document.raw = params[:raw]
        #     # document.save
        #     document.update(raw: params[:raw])
        # else
        # end

        # DocumentBroadcastJob.perform_later(document)

        render json: document
    end

    def new
        @pad = { document: { raw: '# Welcome' } }
        render :view
    end

    def view
        @pad = { document: Document.find(params[:hash_key]) }
    rescue ActiveRecord::RecordNotFound
        render status: 404
    end

    def present
        @renderPad = { document: Document.find(params[:hash_key]),
                      subscribe: true }
    rescue ActiveRecord::RecordNotFound
        render status: 404
    end

    def load
        render json: Document.find(params[:hash_key])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'No document was found', status: 404 }, status: 404
    end
end
