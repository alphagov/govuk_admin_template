require 'spec_helper'

describe 'Layout' do
  subject(:body) { page.body }
  it 'yields the specified content' do
    visit '/'
    expect(body).to include('app_title')
    expect(body).to include('navbar_right')
    expect(body).to include('navbar_item')
    expect(body).to include('main_content')
    expect(body).to include('footer_version')
    expect(body).to include('footer_top')
    expect(body).to include('body_end')
    expect(page).to have_title 'page_title'
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
