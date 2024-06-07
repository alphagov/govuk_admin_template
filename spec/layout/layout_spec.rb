require "climate_control"
require "spec_helper"

describe "Layout" do
  subject(:body) { page.body }

  before do
    # Reset the class instance variables before each test
    GovukAdminTemplate.instance_variable_set(:@environment_style, nil)
    GovukAdminTemplate.instance_variable_set(:@environment_label, nil)
  end

  it "yields the specified content" do
    visit "/"
    expect(body).to include("app_title")
    expect(body).to include("navbar_right")
    expect(body).to include("navbar_item")
    expect(body).to include("main_content")
    expect(body).to include("footer_version")
    expect(body).to include("footer_top")
    expect(body).to include("body_start")
    expect(body).to include("body_end")
    expect(page).to have_title "page_title"
  end

  context "when GOVUK_ENVIRONMENT not set" do
    it "defaults to development environment details" do
      ClimateControl.modify GOVUK_ENVIRONMENT: nil do
        visit "/"
        expect(page).to have_selector(".environment-label", text: "Development")
        expect(page).to have_selector(".environment-preview")
        expect(page.body).to match(/favicon-preview.*.png/)
      end
    end
  end

  context "when GOVUK_ENVIRONMENT is set to production" do
    it "includes details about the current environment" do
      ClimateControl.modify GOVUK_ENVIRONMENT: "production" do
        visit "/"
        expect(page).to have_selector(".environment-label", text: "Production")
        expect(page).to have_selector(".environment-production")
        expect(page.body).to match(/favicon-production-.*.png/)
      end
    end
  end

  context "when GOVUK_ENVIRONMENT is set to integration" do
    it "includes details about the current environment" do
      ClimateControl.modify GOVUK_ENVIRONMENT: "integration" do
        visit "/"
        p body
        expect(page).to have_selector(".environment-label", text: "Integration")
        expect(page).to have_selector(".environment-preview")
        expect(page.body).to match(/favicon-preview-.*.png/)
      end
    end
  end

  it "renders a link to a custom home path" do
    visit "/"
    expect(page).to have_selector('a[href="/style-guide"]', text: "app_title")
  end

  it "renders a bootstrap header" do
    visit "/"
    within ".navbar" do
      expect(page).to have_selector("a.navbar-brand", text: "app_title")
    end
    within "nav" do
      expect(page).to have_selector("ul.navbar-nav li a", text: "navbar_item")
    end
  end

  it "renders a content region from the application" do
    visit "/"
    within "main" do
      expect(page).to have_selector("h1", text: "main_content")
    end
  end

  it "renders a fixed width container by default" do
    visit "/"
    expect(page).to have_selector("body > section.container")
  end

  it "can render a full width page" do
    visit "/full-width"
    expect(page).to have_selector("body > section.container-fluid")
  end

  it "can render a custom navbar" do
    visit "/navbar"
    expect(body).not_to include("app_title")
    expect(body).not_to include("navbar_right")
    expect(body).not_to include("navbar_item")
    expect(page).to have_selector("h1", text: "custom navbar")
  end

  it "renders a footer" do
    visit "/"
    within "footer" do
      expect(page).to have_selector("a", text: "Crown Copyright")
    end
  end

  it "does not include analytics in development" do
    visit "/"
    expect(page).to have_no_selector("script.analytics", visible: :hidden)
  end

  it "renders a flash" do
    visit "/with-flashes"

    expect(page).to have_content("I am an alert with type success")
    expect(page).not_to have_content("I am some other flash")
  end

  describe "in production" do
    before do
      allow(Rails.env).to receive(:production?).and_return(true)
      allow(ENV).to receive(:fetch).and_call_original
      allow(ENV).to receive(:fetch).with("GOVUK_APP_DOMAIN").and_return("root.gov.uk")
    end

    it "includes analytics" do
      visit "/"
      expect(page).to have_selector("script.analytics", visible: :hidden)
      expect(page.body).to include("'root.gov.uk'")
    end

    it "can specify a custom pageview URL" do
      visit "/custom-pageview-url"
      expect(page.html).to include("GOVUKAdmin.trackPageview('/not-the-actual-url-the-user-navigated-to');")
    end
  end
end
