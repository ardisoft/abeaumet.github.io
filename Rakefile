####
# Configuration

dependencies_dir = 'deps'
source_dir = 'src'
built_dir = 'www'
tmp_built_dir = "#{built_dir}_"

jekyll_common_option = "--drafts --config jekyll.yml --source #{source_dir}"
jekyll_dev_option = "--destination #{built_dir} --limit_posts 10"
jekyll_prod_option = "--destination #{tmp_built_dir} --lsi"

####
# Install project dependencies
task :deps do
  (system('bower', 'install') and system('bower-installer')) \
    or abort 'Failed to install dependencies!'
end

task :check_deps do
  Rake::Task[ :deps ].invoke unless File.exists? dependencies_dir
end

####
# Serve project for development
task :dev => [ :clean, :check_deps ] do
  system("jekyll serve --watch #{jekyll_common_option} #{jekyll_dev_option}") \
    or abort 'Failed to serve site!'
end

####
# Build project for production
task :prod => [ :clean, :check_deps ] do
  system("jekyll build #{jekyll_common_option} #{jekyll_prod_option}") \
    or abort 'Failed to build site!'

  system('r.js', '-o', 'optimizer.js') \
    or abort 'Failed to optimize!'

  FileUtils.touch "#{built_dir}/.nojekyll"

  puts 'Project built!'
end

####
# Clean the project (built only)
task :clean do
  FileUtils.rm_rf [built_dir, tmp_built_dir]

  puts 'Project cleaned!'
end

####
# Purge the project (dependencies + built)
task :purge => [ :clean ] do
  FileUtils.rm_rf ["#{source_dir}/css/libs", "#{source_dir}/js/libs", dependencies_dir]

  puts 'Project purged!'
end
