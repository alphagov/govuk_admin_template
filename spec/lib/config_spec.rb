require "spec_helper"

describe GovukAdminTemplate::Config do
  describe "#configure" do
    it "configures the application" do
      GovukAdminTemplate.configure do |config|
        config.app_title = "My Publisher"
      end

      expect(GovukAdminTemplate::Config.app_title).to eql("My Publisher")
    end
  end
end
