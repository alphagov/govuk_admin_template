Dummy::Application.routes.draw do
  mount GovukAdminTemplate::Engine, at: "/style-guide"
  root :to => 'welcome#index'
  match '/full-width' => 'welcome#full_width'
  match '/navbar' => 'welcome#navbar'
end
