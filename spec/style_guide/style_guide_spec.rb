require 'spec_helper'

describe 'Style guide' do
  subject(:body) { page.body }

  it 'includes a style guide at the root of where the app has mounted the engine' do
    visit '/style-guide'
    expect(body).to include('Admin template style guide')
  end
end
