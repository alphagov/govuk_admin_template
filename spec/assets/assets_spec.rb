require 'spec_helper'

describe 'Assets' do
  subject(:asset) { page.body }

  describe 'Static' do
    it 'provides the crown header' do
      visit '/assets/header-crown.png'
      asset.should_not be_empty
    end
  end

  describe 'Compiled JS' do
    it 'includes library code' do
      visit '/assets/govuk_admin_template.js'
      expect(asset).to include('Bootstrap')
      expect(asset).to include('jQuery')
    end
  end
end
