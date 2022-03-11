require "rspec/core/rake_task"
RSpec::Core::RakeTask.new(:spec)

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

task default: [:lint, :spec, :jasmine, "sass:check"]
