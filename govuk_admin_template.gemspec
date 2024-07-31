lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "govuk_admin_template/version"

Gem::Specification.new do |gem|
  gem.name          = "govuk_admin_template"
  gem.version       = GovukAdminTemplate::VERSION
  gem.authors       = ["GOV.UK Dev"]
  gem.email         = ["govuk-dev@digital.cabinet-office.gov.uk"]
  gem.description   = "Styles, scripts and templates for GOV.UK admin applications"
  gem.summary       = gem.description
  gem.homepage      = "https://github.com/alphagov/govuk_admin_template"

  gem.files         = Dir["{app,config,lib}/**/*"] + Dir["*.md"] + %w[LICENCE]
  gem.require_paths = %w[lib]

  gem.required_ruby_version = ">= 3.1"

  gem.add_dependency "bootstrap-sass", "~> 3.4"
  gem.add_dependency "jquery-rails", "~> 4.3"
  gem.add_dependency "plek", ">= 2.1"
  gem.add_dependency "rails", ">= 6"

  gem.add_development_dependency "capybara", "~> 3"
  gem.add_development_dependency "climate_control", "~> 1"
  gem.add_development_dependency "rspec-rails", "~> 6"
  gem.add_development_dependency "rubocop-govuk", "5.0.2"
  gem.add_development_dependency "sassc-rails", "~> 2"
end
