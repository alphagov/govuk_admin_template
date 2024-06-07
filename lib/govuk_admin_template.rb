require "govuk_admin_template/version"
require "govuk_admin_template/engine"
require "govuk_admin_template/config"
require "govuk_admin_template/view_helpers"
require "govuk_admin_template/simple_form"

module GovukAdminTemplate
  mattr_accessor :environment_style, :environment_label

  def self.environment_style
    @environment_style ||= ENV["GOVUK_ENVIRONMENT"] == "production" ? "production" : "preview"
  end

  def self.environment_label
    @environment_label ||= ENV.fetch("GOVUK_ENVIRONMENT", "development").titleize
  end
end
