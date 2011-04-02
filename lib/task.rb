DONE = 'DONE'

get '/taskboard/' do
  erb :taskboard
end

get '/tasks/' do
  result = Task.all(archived: false)
  ary = result.map do |task|
    TaskUtil.to_hash(task)
  end
  content_type :json
  ary.to_json
end

post '/tasks/' do
  data = JSON.parse(request.body.read)
  project = Project.get(data["projectId"])
  title = TaskUtil.title_for(project)
  task = Task.create(
  {
    title: title,
    description: data["description"],
    column: data["column"],
    created: Time.new,
    project: project,
    archived: data["archived"]
  })
  TaskUtil.increase_counter(project)
  status 201
  headers({ "Location" => "/tasks/#{task.id}"})
  content_type :json
  TaskUtil.to_hash(task).to_json
end

put '/tasks/:id' do
  data = JSON.parse(request.body.read)
  task = Task.get(params[:id])
  task.description = data["description"]
  task.column = data["column"]
  if task.column == DONE
    task.closed = Time.new
  else
    task.closed = nil
  end
  task.archived = data["archived"]
  unless task.project.id == data["projectId"]
    project = Project.get(data["projectId"])
    task.project = project
    task.title = TaskUtil.title_for(project)
    TaskUtil.increase_counter(project)
  end

  unless task.save
    status 500
  end
  content_type :json
  TaskUtil.to_hash(task).to_json
end

delete '/tasks/:id' do
  task = Task.get(params[:id])
  unless task.destroy
    status 500
  end
  body nil
end

module TaskUtil
  class << self
    def to_hash(task)
      {
        id: task.id,
        title: task.title,
        description: task.description,
        column: task.column,
        created: task.created,
        closed: task.closed,
        archived: task.archived,
        projectId: task.project.id
      }
    end

    def title_for(project)
      counter = Counter.get(project.id)
      "#{project.name}-#{counter.value + 1}"
    end

    def increase_counter(project)
      counter = Counter.get(project.id)
      counter.value += 1
      unless counter.save
        raise RuntimeError.new("Could not save counter")
      end
    end
  end
end