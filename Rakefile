####
# Configuration

dependencies_dir = 'deps'
source_dir = 'src'
build_dir = 'www'
tmp_build_dir = "#{build_dir}_"

jekyll_common_option = "--config jekyll.yml --source #{source_dir}"
jekyll_dev_option = "--drafts --destination #{build_dir} --limit_posts 10"
jekyll_prod_option = "--destination #{tmp_build_dir} --lsi"

####
# Install site dependencies
desc 'Force dependencies installation'
task :deps do
  (system('bower', 'install') and system('bower-installer')) \
    or abort 'Failed to install dependencies!'
end

desc 'Install dependencies (only if needed)'
task :check_deps do
  Rake::Task[ :deps ].invoke unless File.exists? dependencies_dir
end

####
# Build site
namespace :build do
  desc 'Build (development)'
  task :dev => [ 'clean:build', :check_deps ] do
    system("jekyll build #{jekyll_common_option} #{jekyll_dev_option}") \
      or abort 'Failed to serve!'
  end

  desc 'Build (production)'
  task :prod => [ 'clean:build', :check_deps ] do
    system("jekyll build #{jekyll_common_option} #{jekyll_prod_option}") \
      or abort 'Failed to build!'

    system('r.js', '-o', 'optimizer.js') \
      or abort 'Failed to optimize!'

    File.exists? build_dir \
      or abort 'Failed to build!'

    FileUtils.touch "#{build_dir}/.nojekyll"
    FileUtils.rm_rf tmp_build_dir

    puts 'Built!'
  end
end
task :build => 'build:dev'

####
# Build and Serve site
namespace :serve do
  desc 'Build and serve (development)'
  task :dev => [ 'clean:build', :check_deps ] do
    system("jekyll serve --watch #{jekyll_common_option} #{jekyll_dev_option}") \
      or abort 'Failed to serve!'
  end

  desc 'Build and serve (production)'
  task :prod => 'build:prod' do
    require 'webrick'
    server = WEBrick::HTTPServer.new :Port => 4000
    server.mount '/', WEBrick::HTTPServlet::FileHandler, build_dir
    trap('INT') { server.stop }
    server.start
  end
end
task :serve => 'serve:dev'

####
# Build and Deploy site (production)
desc 'Build and deploy (production)'
task :deploy => 'build:prod' do
  # TO DO
  puts 'Deploying in production...'
end

####
# Clean project
namespace :clean do
  desc 'Clean build'
  task :build do
    FileUtils.rm_rf [build_dir, tmp_build_dir]
    puts 'Build cleaned!'
  end

  desc 'Clean dependencies'
  task :deps do
    FileUtils.rm_rf [dependencies_dir, "#{source_dir}/css/libs", "#{source_dir}/js/libs"]
    puts 'Deps cleaned!'
  end

  desc 'Clean the whole project'
  task :all => ['clean:build', 'clean:deps']
end
task :clean => 'clean:build'
