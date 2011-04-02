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

  belongs_to :project
end

class Project
  include DataMapper::Resource

  property :id,   Serial
  property :name, String

  has n, :tasks
  has 1, :counter
end

class Counter
  include DataMapper::Resource

  property :value,       Integer, required: true

  belongs_to :project, key: true
end

DataMapper.finalize


