require "bundler/gem_tasks"

# The jasmine gem isn't designed for testing engines
#
# Proxy jasmine calls onto the dummy app's rakefile
# Running jasmine from root prevents the spec files
# from being compiled through the asset pipeline
#
# Import all dummy app rake tasks under a namespace

namespace :dummy_app do
  require File.expand_path('../spec/dummy/config/application', __FILE__)
  Dummy::Application.load_tasks
end

