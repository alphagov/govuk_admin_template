require "spec_helper"

describe "Layout" do
  subject(:body) { page.body }

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

  context "when no environment set" do
    it "defaults to not showing any environment details" do
      GovukAdminTemplate.environment_style = nil
      visit "/"
      expect(page).not_to have_selector(".environment-label")
      expect(page).not_to have_selector(".environment-message")
      expect(page.body).to match(/favicon-.*.png/)
    end
  end

  context "when in a development environment" do
    it "includes details about the current environment" do
      GovukAdminTemplate.environment_style = "development"
      visit "/"
      expect(page).to have_selector(".environment-label", text: "Development")
      expect(page).to have_selector(".environment-development")
      expect(page.body).to match(/favicon-development-.*.png/)
    end
  end

  context "when in a test environment" do
    it "includes details about the current environment" do
      GovukAdminTemplate.environment_style = "test"
      visit "/"
      expect(page.body).to match(/favicon-test-.*.png/)
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
