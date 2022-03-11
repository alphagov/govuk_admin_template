# Load RSpec rake task as :spec
require "rspec/core/rake_task"
RSpec::Core::RakeTask.new(:spec)

# Load rake tasks from the dummy Rails app located at spec/dummy
# This will also load rake tasks from lib/tasks
APP_RAKEFILE = File.expand_path("spec/dummy/Rakefile", __dir__)
load "rails/tasks/engine.rake"

# Define default tasks to run
task default: %w[app:lint app:spec app:jasmine app:sass:check]
