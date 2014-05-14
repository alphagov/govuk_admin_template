module GovukAdminTemplate
  class Engine < ::Rails::Engine
    require 'bootstrap-sass'

    initializer 'govuk_admin_template.assets.precompile' do |app|
      app.config.assets.precompile += %w(lte-ie8.js)
    end
  end
end
