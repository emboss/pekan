get '/projects/' do
  result = Project.all
  ary = result.map do |project|
    {
      id: project.id,
      name: project.name
    }
  end
  content_type :json
  ary.to_json
end

post '/projects/' do
  data = JSON.parse(request.body.read)
  project = Project.create(
  {
    name: data["name"]
  })
  status 201
  headers({ "Location" => "/projects/#{project.id}"})
  body nil
end