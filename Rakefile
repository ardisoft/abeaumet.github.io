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
# Install site dependencies
desc 'Force dependencies installation'
task :deps do
  (system('bower', 'install') and system('bower-installer')) \
    or abort 'Failed to install dependencies!'
end

desc 'Install dependencies only if needed'
task :check_deps do
  Rake::Task[ :deps ].invoke unless File.exists? dependencies_dir
end

####
# Serve site for development
desc 'Build and serve site for development purpose'
task :dev => [ :clean, :check_deps ] do
  system("jekyll serve --watch #{jekyll_common_option} #{jekyll_dev_option}") \
    or abort 'Failed to serve site!'
end

####
# Build site for production
desc 'Build and optimize site for production'
task :prod => [ :clean, :check_deps ] do
  system("jekyll build #{jekyll_common_option} #{jekyll_prod_option}") \
    or abort 'Failed to build site!'

  system('r.js', '-o', 'optimizer.js') \
    or abort 'Failed to optimize!'

  abort 'Failed to build site!' unless File.exists? built_dir

  FileUtils.touch "#{built_dir}/.nojekyll"

  puts 'Site built!'

  FileUtils.rm_rf tmp_built_dir
end

####
# Clean the site (built only)
desc 'Remove the generated site'
task :clean do
  FileUtils.rm_rf [built_dir, tmp_built_dir]

  puts 'Site cleaned!'
end

####
# Purge the site (dependencies + built)
desc 'Remove the generated site and the dependencies'
task :purge => [ :clean ] do
  FileUtils.rm_rf ["#{source_dir}/css/libs", "#{source_dir}/js/libs", dependencies_dir]

  puts 'Site purged!'
end
