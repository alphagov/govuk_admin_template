class WelcomeController < ApplicationController
  def with_flashes
    %w[success info warning danger].each do |type|
      flash[type] = "I am an alert with type #{type}"
    end

    flash[:not_one_of_the_bootstrap_classes] = "I am some other flash"
  end
end
