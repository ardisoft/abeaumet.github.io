####
# Install project dependencies
task :default do
  system('bower install')
  system('bower-installer')
end

####
# Build project and run a http server
namespace :serve do
  # Dev (default task in this namespace)
  task :dev do
    system('jekyll serve --watch --drafts --limit_posts') or abort('Failed!')
  end
  # Prod
  task :prod do
    system('jekyll build --drafts --lsi') or abort('Failed!')
  end
end

# Set default serve task if none is specified
task :serve => 'serve:dev'

####
# Clean the project
task :clean do
  system('rm -rf ./components ./css/libs ./js/libs ./_site') or abort('Failed!')
  puts 'Project cleaned!'
end
