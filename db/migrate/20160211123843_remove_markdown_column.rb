class RemoveMarkdownColumn < ActiveRecord::Migration
  def self.up
      remove_column :documents, :markdown
  end
end
