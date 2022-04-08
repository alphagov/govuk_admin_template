# Load RSpec rake task as :spec
require "rspec/core/rake_task"
RSpec::Core::RakeTask.new(:spec)

# Load rake tasks from the dummy Rails app located at spec/dummy
APP_RAKEFILE = File.expand_path("spec/dummy/Rakefile", __dir__)
load "rails/tasks/engine.rake"

desc "Run Jasmine tests"
task jasmine: :environment do
  sh "yarn run jasmine:ci"
end

desc "Lint files"
task "lint" => :environment do
  sh "bundle exec rubocop"
end

# Define default tasks to run
task default: %w[lint app:spec jasmine app:sass:check]
