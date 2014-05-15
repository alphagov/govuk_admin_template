require "bundler/gem_tasks"

# The jasmine gem isn't designed for testing engines
#
# Proxy jasmine calls onto the dummy app's rakefile
# Running jasmine from root prevents the spec files
# from being compiled through the asset pipeline
#
# Emulate API from here

desc 'Run specs via dummy app and server:ci'
task :jasmine do
  `bundle exec rake -f spec/dummy/Rakefile jasmine`
end

namespace :jasmine do
  desc 'Run continuous integration tests via dummy app'
  task :ci do
    `bundle exec rake -f spec/dummy/Rakefile jasmine:ci`
  end
end
