module GovukAdminTemplate
  def self.configure
    yield(Config)
  end

  module Config
    # Name of your application
    mattr_accessor :app_title
    @@app_title = "GOV.UK"

    # Show flash-messages
    # Default: false
    mattr_accessor :show_flash

    # Show username and signout link in the top right corner
    # Default: false
    mattr_accessor :show_signout

    # Disable analytics
    # Default: false
    mattr_accessor :disable_google_analytics
  end
end
