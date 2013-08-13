#################
# Configuration #
#################

dependencies_dir = 'deps'
source_dir = 'src'
libs_dir = "#{source_dir}/libs"
build_dir = 'www'
tmp_build_dir = "#{build_dir}_"

jekyll_common_option = "--config jekyll.yml --source #{source_dir}"
jekyll_dev_option = "--drafts --destination #{build_dir} --limit_posts 10"
jekyll_prod_option = "--destination #{tmp_build_dir} --lsi"

sass_input_dir = "#{source_dir}/_scss"
sass_output_dir = "#{source_dir}/css"
sass_common_option = "#{sass_input_dir}:#{sass_output_dir} --no-cache"


################
# Dependencies #
################

desc 'Force dependencies installation'
task :deps do
  (system('bower-installer') and FileUtils.rm_rf dependencies_dir) \
    or abort 'Failed to install dependencies!'
end

desc 'Install dependencies (only if needed)'
task :smart_deps do
  Rake::Task[:deps].invoke unless File.exists? libs_dir
end


######################################
# Build and Serve site (development) #
######################################

desc 'Build and serve (development)'
task :dev => ['clean:build', :smart_deps] do
  jekyllPid = Process.spawn("jekyll serve --watch #{jekyll_common_option} #{jekyll_dev_option}")
  sassPid = Process.spawn("sass --watch #{sass_common_option}")

  trap("INT") {
    [jekyllPid, sassPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, sassPid].each { |pid| Process.wait(pid) }
end


#####################################
# Build and Serve site (production) #
#####################################

desc 'Build and serve (production)'
task :prod => ['clean:build', :smart_deps] do
  system("sass --update #{sass_common_option}") \
    or abort 'Failed to compile SASS files!'

  system("jekyll build #{jekyll_common_option} #{jekyll_prod_option}") \
    or abort 'Failed to build!'

  system('r.js', '-o', 'optimizer.js') \
    or abort 'Failed to optimize!'

  FileUtils.rm_rf tmp_build_dir

  require 'webrick'
  server = WEBrick::HTTPServer.new :Port => 4000
  server.mount '/', WEBrick::HTTPServlet::FileHandler, build_dir

  trap('INT') {
    server.stop
  }

  server.start
end


###############
# Deploy site #
###############

task :deploy => ['clean:build'] do
  # TO DO
end


#################
# Clean project #
#################

namespace :clean do
  desc 'Clean build'
  task :build do
    FileUtils.rm_rf [build_dir, tmp_build_dir, sass_output_dir]
    puts 'Build cleaned!'
  end

  desc 'Clean dependencies'
  task :deps do
    FileUtils.rm_rf [dependencies_dir, libs_dir]
    puts 'Dependencies cleaned!'
  end

  desc 'Clean the whole project'
  task :all => ['clean:build', 'clean:deps']
end
task :clean => 'clean:all'
