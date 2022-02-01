module GovukAdminTemplate
  module ViewHelpers
    def display_flash_message
      html = []

      flash.each do |type, message|
        next unless type.to_sym.in?(%i[success info warning danger])

        html << content_tag(:div, message, class: "alert alert-#{type}")
      end

      html.join.html_safe
    end
  end
end
