Dummy::Application.routes.draw do
  mount GovukAdminTemplate::Engine, at: "/style-guide"
  root to: "welcome#index"
  get "/full-width" => "welcome#full_width"
  get "/custom-pageview-url" => "welcome#custom_pageview_url"
  get "/navbar" => "welcome#navbar"
  get "/with-flashes" => "welcome#with_flashes"
end
