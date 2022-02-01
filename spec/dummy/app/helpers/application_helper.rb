module ApplicationHelper
  # Make this dummy app behave like gds-sso is included.
  def current_user
    OpenStruct.new(name: "A Test User")
  end
end
