# GOV.UK Admin Template

Styles, scripts and templates wrapped up in a gem for getting up and running with [Bootstrap](http://getbootstrap.com) based backend admin apps.

This gem provides (via a Rails engine):
* jQuery
* Bootstrap 3 standard styles and javascript — including HTML5 and respond.js shims necessary for IE <= IE8
* An admin layout with header and footer
* A [lightweight javascript framework](JAVASCRIPT.md)
* Admin design patterns available from `/style-guide` (when routes are mounted)
* SASS variables for the admin theme
* GOV.UK user friendly date formats

## Usage

Firstly, include the gem in your Gemfile, pinned to the appropriate version and run ```bundle```:
```ruby
gem 'govuk-admin-template', '0.0.1'
```

At the top of `application.scss` include the styles (this provides all the mixins and variables from the gem as well as from bootstrap — [bootstrap mixins](https://github.com/twbs/bootstrap-sass/blob/master/vendor/assets/stylesheets/bootstrap/_mixins.scss)):
```css
@import 'govuk_admin_template';
```

In `application.html.erb` after any content blocks you want to include, render the base template:
```erb
<%= render :template => 'layouts/govuk_admin_template' %>
```

The [base template](app/views/layouts/govuk_admin_template.html.erb) includes:
* Javascript and non-Javascript classes
* Mobile friendly viewport
* Bootstrap and jQuery javascript
* IE HTML5 and respondjs shims, and HTML classes
* header HTML
* footer HTML

You will also need to include your styles within the `<head>` of your HTML, do this using nested layouts:
```erb
<% content_for :head do %>
  <%= stylesheet_link_tag "application", :media => "all" %>
<% end %>
```

It is recommended that the style guide is also made available within your app at the route `/style-guide`. Add this to your `config/routes.rb` file:

```ruby
mount GovukAdminTemplate::Engine, at: "/style-guide"
```

The gem source includes a [dummy app](spec/dummy) configured to behave like an app using the gem. If you have the gem checked out it can be run from the `spec\dummy` directory using `rails s`.

For Javascript usage, available modules and writing modules, see the [Javascript guide](JAVASCRIPT.md).

### Content blocks

The gem [uses nested layouts](http://guides.rubyonrails.org/layouts_and_rendering.html#using-nested-layouts) for customisation.

content_for    | Description
-------------  | -------------
app_title      | Name of your admin application
content        | Main content
head           | HTML to include in the <head> of your application
page_title     | Page title
navbar_items   | A set of HTML list items (`<li>`) forming the primary navigation
navbar_right   | Text to the right of the nav bar. Logged in user, sign out link, etc
footer_top (optional) | Footer content before copyright text
footer_version (optional) | Text indicating the release, eg commit SHA
body_end (optional) | Just before the `</body>` tag

Example navbar_items:
```erb
<% content_for :navbar_items do %>
  <li>
    <a href="#">navbar_item</a>
  </li>
<% end %>
```

### Date formats

The [gem includes](lib/govuk_admin_template/engine.rb) `:govuk_date` date and time formats which match the [recommended style](https://www.gov.uk/design-principles/style-guide/style-points#style-dates-and-times).

```ruby
# 1 January 2013
date.to_s(:govuk_date)

# 1:15pm, 1 January 2013
time.to_s(:govuk_date)
```

## Development

Clone the repository and run `bundle`.

The source files are in the [app](app) directory. Unlike other GOVUK frontend gems, there is no compile step. The app directory is included in the gem and hooked in as a Rails engine.

While developing it may be helpful to see how the gem will render. The dummy app at [spec/dummy](spec/dummy) is configured to act like an application using the gem and can be started from that directory using `rails s`. Changes will show immediately. The tests also run against this app.

The dummy app’s rake tasks have been loaded into the gem’s task list under the namespace `dummy_app` for convenience.

### Running tests

The default rake task runs all tests:
```
bundle exec rake
```

Layout and nested layouts are tested using RSpec and Capybara:
```
bundle exec rake spec
```

Javascript is tested using Jasmine and the [Jasmine gem](https://github.com/pivotal/jasmine-gem). Tests can be run either in the browser or on the command line via the dummy app’s tasks:
```sh
# browser
bundle exec rake dummy_app:jasmine

# command line
bundle exec rake dummy_app:jasmine:ci
```

## Publishing

Version bumps will automatically update RubyGems.org.
