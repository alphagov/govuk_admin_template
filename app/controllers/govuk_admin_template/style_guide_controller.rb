module GovukAdminTemplate
  class StyleGuideController < ApplicationController
    def index
      @normal_link_href = "#{request.original_url}##{Time.zone.now.utc.to_i}"
      @visited_link_href = request.original_url
    end
  end
end
