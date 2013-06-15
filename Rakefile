# Install project dependencies
task :default do
  system('bower install');
  system('bower-installer');
end

# Build project and run a http server
task :serve => [:default] do
  system('jekyll serve --watch');
end

# Clean the project
task :clean do
  system('rm -vrf ./components ./css/libs ./js/libs ./_site');
end
