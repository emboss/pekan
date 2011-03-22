require 'dm-core'

DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/pekan.db")

class Task
  include DataMapper::Resource

  property :id,          Serial
  property :title,       String
  property :description, Text
  property :column,      String
  property :created,     DateTime
  property :closed,      DateTime
  property :archived,    Boolean
end

DataMapper.finalize


