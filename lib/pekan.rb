require 'sinatra'
require 'erb'
require 'json'
require_relative 'models'
require_relative 'task'
require_relative 'administration'
require_relative 'setup'
require_relative 'project'

get '/' do
  if Project.count == 0 and Task.count == 0
    redirect to('/setup/')
  else
    redirect to('/taskboard/')
  end
end

