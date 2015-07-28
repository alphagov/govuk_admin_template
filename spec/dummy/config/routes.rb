Dummy::Application.routes.draw do
  mount GovukAdminTemplate::Engine, at: "/style-guide"
  root :to => 'welcome#index'
  match '/full-width' => 'welcome#full_width'
  match '/exclude-analytics' => 'welcome#exclude_analytics'
  match '/navbar' => 'welcome#navbar'
end
