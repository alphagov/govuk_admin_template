require "govuk_admin_template/version"
require "govuk_admin_template/engine"
require "govuk_admin_template/config"
require "govuk_admin_template/view_helpers"
require "govuk_admin_template/simple_form"

module GovukAdminTemplate
  mattr_accessor :environment_style, :environment_label

  def self.environment_style
    @@environment_style || default_environment_style
  end

  def self.environment_label
    @@environment_label || environment_style.try(:titleize)
  end

  # In development we can't consistently set an environment
  # variable, so use a default based on Rails.env
  def self.default_environment_style
    if Rails.env.development?
      "development"
    end
  end
end
