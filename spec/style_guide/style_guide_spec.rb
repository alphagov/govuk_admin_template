require 'spec_helper'

describe 'Style guide' do
  subject(:body) { page.body }

  it 'includes a style guide at the root of where the app has mounted the engine' do
    visit '/style-guide'
    expect(body).to include('Admin template style guide')
  end

  it 'includes formatted dates' do
    visit '/style-guide'
    expect(body).to include('31 October 2013')
    expect(body).to include('12:00am, 31 October 2013')

    expect(body).to include('31 Oct 2013')
    expect(body).to include('12:00am, 31 Oct 2013')
  end
end
