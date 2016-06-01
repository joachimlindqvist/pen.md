class ChangeDocumentHashToNonCollidingName < ActiveRecord::Migration
    def self.up
        rename_column :documents, :hash, :hash_key
    end
end
