module GovukAdminTemplate
  def self.configure
    yield(Config)
  end

  module Config
    # Name of your application
    mattr_accessor :app_title
    @@app_title = "GOV.UK"
  end
end
