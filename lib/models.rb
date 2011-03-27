require 'dm-core'

DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/pekan.db")

class Task
  include DataMapper::Resource

  property :id,          Serial
  property :title,       String,  required: true
  property :description, Text
  property :column,      String,  required: true
  property :created,     DateTime
  property :closed,      DateTime
  property :archived,    Boolean, required: true

  has 1, :project
end

class Project
  include DataMapper::Resource

  property :id,   Serial
  property :name, String, key: true
end

class Counter
  include DataMapper::Resource

  property :value,       Integer, required: true

  belongs_to :project, key: true
end

DataMapper.finalize


