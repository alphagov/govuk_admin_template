# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'govuk_admin_template/version'

Gem::Specification.new do |gem|
  gem.name          = "govuk_admin_template"
  gem.version       = GovukAdminTemplate::VERSION
  gem.authors       = ["GOV.UK Dev"]
  gem.email         = ["govuk-dev@digital.cabinet-office.gov.uk"]
  gem.description   = %q{Styles, scripts and templates for GOV.UK admin applications}
  gem.summary       = gem.description
  gem.homepage      = "https://github.com/alphagov/govuk_admin_template"

  gem.files         = Dir["{app,config,lib}/**/*"] + Dir["*.md"] + ["LICENCE.txt"]
  gem.require_paths = ["lib"]

  gem.required_ruby_version = '>= 1.9.3'

  gem.add_dependency 'rails', '>= 3.2.0'
  gem.add_dependency 'bootstrap-sass', '3.3.5.1'
  gem.add_dependency 'jquery-rails', '~> 4.1.1'

  gem.add_development_dependency 'sass-rails', '5.0.6'
  gem.add_development_dependency 'rspec-rails', '~> 3.5'
  gem.add_development_dependency 'capybara', '2.4.4'
  gem.add_development_dependency 'gem_publisher', '1.3.1'
  gem.add_development_dependency 'jasmine', '2.4.0'
  gem.add_development_dependency 'govuk-lint', '1.2.1'
end
