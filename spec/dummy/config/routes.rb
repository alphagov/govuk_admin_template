Dummy::Application.routes.draw do
  mount GovukAdminTemplate::Engine, at: "/style-guide"
  root :to => 'welcome#index'
end
