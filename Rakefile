####
# Configuration

jekyll_common_option = '--drafts'
jekyll_dev_option = '--limit_posts 10'
jekyll_prod_option = '--lsi'

####
# Install project dependencies
task :default do
  system('bower install && bower-installer') or abort('Failed to install dependencies!')
end

####
# Build project and run a http server
namespace :serve do
  # Dev (default task in this namespace)
  task :dev do
    system("jekyll serve --watch #{jekyll_common_option} #{jekyll_dev_option}") or abort('Failed to serve site!')
  end
  # Prod
  task :prod do
    system("jekyll build #{jekyll_common_option} #{jekyll_prod_option}") or abort('Failed to build site!')
    system('cd ./_site ; python -m SimpleHTTPServer 4000') or abort('Failed to serve site!')
  end
end

# Set default serve task if none is specified
task :serve => 'serve:dev'

####
# Clean the project
task :clean do
  system('rm -rf ./components ./css/libs ./js/libs ./_site') or abort('Failed to clean the project!')
  puts 'Project cleaned!'
end
