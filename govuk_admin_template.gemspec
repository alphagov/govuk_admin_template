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

  gem.files         = Dir["{app,lib}/**/*"] + ["LICENCE.txt", "README.md"]
  gem.require_paths = ["lib"]

  gem.add_dependency 'rails', '>= 3.2.0'
  gem.add_dependency 'bootstrap-sass', '3.1.0'
  gem.add_dependency 'jquery-rails', '3.0.4'

  # There are some further development dependencies in the gemfile
  gem.add_development_dependency 'rails', '3.2.18'
  gem.add_development_dependency 'sass-rails', '3.2.6'
  gem.add_development_dependency 'rspec-rails', '2.14.2'
  gem.add_development_dependency 'capybara', '2.2.1'
  gem.add_development_dependency 'gem_publisher', '1.3.1'
end
