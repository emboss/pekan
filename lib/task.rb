DONE = 'DONE'

get '/taskboard/' do
  erb :taskboard
end

get '/tasks/' do
  result = Task.all(archived: false)
  ary = result.map do |task|
    {
      id: task.id,
      title: task.title,
      description: task.description,
      column: task.column,
      created: task.created,
      closed: task.closed,
      archived: task.archived
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
    column: data["column"],
    created: Time.new,
    archived: data["archived"]
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
  if task.column == DONE
    task.closed = Time.new
  else
    task.closed = nil
  end
  task.archived = data["archived"]
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
