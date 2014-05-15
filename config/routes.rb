Rails.application.routes.draw do
  match 'style-guide' => 'govuk_admin_template/style_guide#index'
end
