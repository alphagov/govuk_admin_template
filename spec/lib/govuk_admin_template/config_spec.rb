require "spec_helper"

describe GovukAdminTemplate::Config do
  describe "#configure" do
    it "configures the application" do
      GovukAdminTemplate.configure do |config|
        config.app_title = "My Publisher"
        config.disable_google_analytics = false
      end

      expect(described_class.app_title).to eql("My Publisher")
      expect(described_class.disable_google_analytics).to be(false)
    end
  end
end
