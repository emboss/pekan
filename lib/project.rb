get '/projects/' do
  result = Project.all
  ary = result.map do |project|
    ProjectUtil.to_hash(project)
  end
  content_type :json
  ary.to_json
end

get '/projects/first' do
  min = Project.min
  content_type :json
  [ ProjectUtil.to_hash(min) ].to_json
end

get '/projects/:id' do
  project = Project.get(params[:id])
  content_type :json
  [ ProjectUtil.to_hash(project) ].to_json
end

get '/projects/:id/count/' do
  counter = Counter.get(project_id: params[:id])
  content_type :json
  { value: counter.value }
end

post '/projects/' do
  data = JSON.parse(request.body.read)
  project = Project.create(
  {
    name: data["name"]
  })
  Counter.create(
  {
    value: 0,
    project: project
  })
  status 201
  headers({ "Location" => "/projects/#{project.id}"})
  body nil
end

module ProjectUtil
  class << self
    def to_hash(project)
      {
          id: project.id,
          name: project.name
      }
    end
  end
end