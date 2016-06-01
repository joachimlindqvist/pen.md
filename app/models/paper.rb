class Paper < ApplicationRecord
  after_create_commit { PaperBroadcastJob.perform_later self }
end
