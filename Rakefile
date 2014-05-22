require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

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

task(:default).clear
task :default => [:spec, 'dummy_app:jasmine:ci']

require "gem_publisher"

desc "Publish gem to RubyGems.org"
task :publish_gem do |t|
  gem = GemPublisher.publish_if_updated("govuk_admin_template.gemspec", :rubygems)
  puts "Published #{gem}" if gem
end
