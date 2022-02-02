require "rspec/core/rake_task"

# The jasmine gem isn't designed for testing engines
#
# Proxy jasmine calls onto the dummy app's rakefile
# Running jasmine from root prevents the spec files
# from being compiled through the asset pipeline
#
# Import all dummy app rake tasks under a namespace

namespace :assets do
  desc "Placeholder rake task for precompile"
  task precompile: :environment do |_t|
    puts "Placeholder"
  end

  desc "Placeholder rake task for clean"
  task clean: :environment do |_t|
    puts "Placeholder"
  end

  desc "Placeholder rake task for clobber"
  task clobber: :environment do |_t|
    puts "Placeholder"
  end
end

namespace :dummy_app do
  require File.expand_path("spec/dummy/config/application", __dir__)
  Dummy::Application.load_tasks
end

# Load local tasks
Rails.application.load_tasks

# RSpec shoves itself into the default task without asking, which confuses the ordering.
# https://github.com/rspec/rspec-rails/blob/eb3377bca425f0d74b9f510dbb53b2a161080016/lib/rspec/rails/tasks/rspec.rake#L6
Rake::Task[:default].clear if Rake::Task.task_defined?(:default)
task default: ["lint", :spec, "dummy_app:jasmine:ci", "sass:check"]
