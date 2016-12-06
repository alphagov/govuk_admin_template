require "spec_helper"

describe GovukAdminTemplate::Config do
  describe "#configure" do
    it "configures the application" do
      GovukAdminTemplate.configure do |config|
        config.app_title = "My Publisher"
        config.disable_google_analytics = false
      end

      expect(GovukAdminTemplate::Config.app_title).to eql("My Publisher")
      expect(GovukAdminTemplate::Config.disable_google_analytics).to eql(false)
    end
  end
end
