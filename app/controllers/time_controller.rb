class TimeController < ApplicationController

    def index
        server_timestamp = DateTime.now.strftime('%Q').to_i
        render json: {
            diff: server_timestamp - params[:timestamp].to_i,
            time: server_timestamp
        }
    end

end
