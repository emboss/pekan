require 'sinatra'
require 'erb'
require 'json'
require 'pp'
require_relative 'models'

get '/' do
  erb :index
end

get '/tasks/' do
  result = Task.all
  ary = []
  pp result
  result.each do |task|
    ary << {
        id: task.id,
        title: task.title,
        description: task.description,
        column: task.column
    }
  end
  content_type :json
  ary.to_json
end

post '/tasks/' do
  data = JSON.parse(request.body.read)
  task = Task.create(
  {
    title: data["title"],
    description: data["description"],
    column: data["column"]
  })
  status 201
  headers({ "Location" => "/tasks/#{task.id}"})
  body nil
end

put '/tasks/:id' do
  data = JSON.parse(request.body.read)
  task = Task.get(params[:id])
  task.title = data["title"]
  task.description = data["description"]
  task.column = data["column"]
  unless task.save
    status 500
  end
  body nil
end

delete '/tasks/:id' do
  task = Task.get(params[:id])
  unless task.destroy
    status 500
  end
  body nil
end

