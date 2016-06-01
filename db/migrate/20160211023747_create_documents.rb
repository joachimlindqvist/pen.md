class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :hash, limit: 10
      t.text :raw
      t.text :markdown

      t.timestamps null: false
    end
    add_index :documents, :hash, unique: true
  end
end
