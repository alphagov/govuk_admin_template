require 'spec_helper'

describe 'Layout' do
  subject(:body) { page.body }
  it 'yields the specified content' do
    visit '/'
    expect(body).to include('app_title')
    expect(body).to include('navbar_right')
    expect(body).to include('navbar_item')
    expect(body).to include('main_content')
    expect(body).to include('before_content')
    expect(body).to include('footer_version')
    expect(body).to include('footer_top')
    expect(body).to include('body_end')
    expect(page).to have_title 'page_title'
  end

  context 'no environment set' do
    it 'defaults to not showing any environment details' do
      GovukAdminTemplate.environment_style = nil
      visit '/'
      expect(page).not_to have_selector('.environment-label')
      expect(page).not_to have_selector('.environment-message')
      expect(page.body).to include("favicon.png")
    end
  end

  context 'in a development environment' do
    it 'includes details about the current environment' do
      GovukAdminTemplate.environment_style = "development"
      visit '/'
      expect(page).to have_selector('.environment-label', text: 'Development')
      expect(page).to have_selector('.environment-development')
      expect(page.body).to include("favicon-development.png")
    end
  end

  it 'renders a bootstrap header' do
    visit '/'
    within '.navbar' do
      expect(page).to have_selector('a.navbar-brand', text: 'app_title')
    end
    within 'nav' do
      expect(page).to have_selector('ul.navbar-nav li a', text: 'navbar_item')
    end
  end

  it 'renders a content region from the application' do
    visit '/'
    within 'main' do
      expect(page).to have_selector('h1', text: 'main_content')
    end
  end

  it 'renders a footer' do
    visit '/'
    within 'footer' do
      expect(page).to have_selector('a', text: 'Crown Copyright')
    end
  end
end
