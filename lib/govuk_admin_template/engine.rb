module GovukAdminTemplate
  class Engine < ::Rails::Engine
    require 'bootstrap-sass'
    require 'jquery-rails'

    initializer 'govuk_admin_template.assets.precompile' do |app|
      app.config.assets.precompile += %w(lte-ie8.js govuk-admin-template.js)
      app.config.assets.precompile += %w(govuk_admin_template/favicon-development.png govuk_admin_template/favicon-test.png govuk_admin_template/favicon-integration.png
                                          govuk_admin_template/favicon-preview.png govuk_admin_template/favicon-production.png govuk_admin_template/favicon.png)

    end

    # User friendly GOV.UK date formats, based on:
    # https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates
    # https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#times
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

    initializer "govuk_admin_template.view_helpers" do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end
