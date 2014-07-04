module GovukAdminTemplate
  class Engine < ::Rails::Engine
    require 'bootstrap-sass'
    require 'jquery-rails'

    initializer 'govuk_admin_template.assets.precompile' do |app|
      app.config.assets.precompile += %w(lte-ie8.js govuk-admin-template.js govuk_admin_template/bootstrap-ie7.css)
    end

    # User friendly GOV.UK date formats, based on:
    # https://www.gov.uk/design-principles/style-guide/style-points#style-dates-and-times
    initializer 'govuk_admin_template.date_formats' do |app|
      # 1 January 2013
      Date::DATE_FORMATS[:govuk_date] = '%-e %B %Y'

      # 1 Jan 2013
      Date::DATE_FORMATS[:govuk_date_short] = '%-e %b %Y'

      # 1:15pm, 1 January 2013
      Time::DATE_FORMATS[:govuk_date] = '%-I:%M%P, %-e %B %Y'

      # 1:15pm, 1 Jan 2013
      Time::DATE_FORMATS[:govuk_date_short] = '%-I:%M%P, %-e %b %Y'

      # 1:15pm
      Time::DATE_FORMATS[:govuk_time] = '%-I:%M%P'
    end
  end
end
