class Document < ActiveRecord::Base

    before_create :assign_unique_hash_key
    self.primary_key = :hash_key

    # def self.find(hash_key)
    #     where(hash_key: hash_key).first!
    # end

    def self.safe_chunk_update(hash_key:, update:)
        ActiveRecord::Base.transaction do
            document = Document.find(hash_key)
            document.update_raw_chunk(update)
            document.save
        end
    end

    def update_raw_chunk(update)
        puts self.as_json
        if update['type'] == 'insert'
            insert_raw_chunk(update)
        else
            delete_raw_chunk(update)
        end
        puts self.as_json
    end

    def insert_raw_chunk(update)
        head = self.raw[0...update['position']]
        tail = self.raw[(update['position'] + update['length'])..-1]
        self.raw = [head, update['chunk'], tail].join
        save
    end

    def delete_raw_chunk(update)
        head = self.raw[0...update['position']]
        tail = self.raw[(update['position'] + update['length'])..-1]
        self.raw = [head, tail].join
        save
    end

    def serializable
        document = self.as_json
        Hash[document.map { |key, val|
            val = case val
            when Time
                val.iso8601(3)
            else
                val
            end

            [key, val]
        }]
    end

    private

    def assign_unique_hash_key
        self.hash_key = random_hash_key until unique_hash_key?
    end

    def unique_hash_key?
        self.class.where(hash_key: self.hash_key).count == 0
    end

    def random_hash_key
        10.times.map { [*'0'..'9', *'a'..'z', *'A'..'Z'].sample }.join
    end
end
