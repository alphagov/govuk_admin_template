require "spec_helper"

describe "Assets" do
  subject(:asset) { page.body }

  it "serves images, eg the crown header" do
    visit "/assets/govuk_admin_template/header-crown.png"
    expect(asset).to_not be_empty
  end

  describe "Compiling javascript" do
    it "compiles library code" do
      visit "/assets/govuk-admin-template.js"
      expect(asset).to include("Bootstrap")
      expect(asset).to include("jQuery")
    end

    it "compiles IE shims" do
      visit "/assets/lte-ie8.js"
      expect(asset).to include("respond")
      expect(asset).to include("html5")
    end
  end
end
