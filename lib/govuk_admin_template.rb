require "govuk_admin_template/version"
require "govuk_admin_template/engine"

module GovukAdminTemplate
  mattr_accessor :environment_style, :environment_label, :google_analytics

  def self.environment_style
    @@environment_style || self.default_environment_style
  end

  def self.environment_label
    @@environment_label || self.environment_style.try(:titleize)
  end

  # In development we can't consistently set an environment
  # variable, so use a default based on Rails.env
  def self.default_environment_style
    if Rails.env.development?
      "development"
    end
  end

  def self.google_analytics
    @@google_analytics || Rails.env.production?
  end

  def self.google_analytics?
    !!self.google_analytics
  end
end
