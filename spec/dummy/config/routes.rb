Dummy::Application.routes.draw do
  mount GovukAdminTemplate::Engine, at: "/style-guide"
  root :to => 'welcome#index'
  get '/full-width' => 'welcome#full_width'
  get '/exclude-analytics' => 'welcome#exclude_analytics'
  get '/navbar' => 'welcome#navbar'
end
