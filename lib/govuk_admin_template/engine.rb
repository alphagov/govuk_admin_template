module GovukAdminTemplate
  class Engine < ::Rails::Engine
    require 'bootstrap-sass'
    require 'jquery-rails'

    initializer 'govuk_admin_template.assets.precompile' do |app|
      app.config.assets.precompile += %w(lte-ie8.js govuk-admin-template.js)
    end
  end
end
