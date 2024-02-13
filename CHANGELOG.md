## Unreleased

* Drop support for Ruby 2.7.
* Drop support for Ruby 3.0. The minimum required Ruby version is now 3.1.4.
* Add support for Ruby 3.3.

# 6.10.0

* Remove Priority list from govspeak help example

# 6.9.2

* Fix providing gem internal Rake tasks to applications embedding this gem as an engine.

# 6.9.1

* Fix broken Rails 6 compatibility: use `Date#to_formatted_s` instead of `Date#to_fs`

# 6.9.0

* Rails 7 compatibility: use `Time#to_fs` instead of deprecated use of `Time#to_s`
* Bump minimum supported Rails version to 6
* Fix broken 'Crown Copyright' link in the layout template page footer

# 6.8.1

* Ensure labels have sufficient colour contrast

# 6.8.0

* Replace the development dependency govuk-lint with rubocop-govuk
* Fix colour contrast issues flagged by WAVE Web Accessibility Evaluation Tool
* Ensure govspeak guidance can be navigated to via keyboard tabbing

# 6.7.0

* Update bootstrap-sass dependency to 3.4.1 (from 3.3.5.1)

# 6.6.0

* Use the external URL for Signon
* Explicitly declare a dependency on `plek`

# 6.5.0

* Remove IE7 support
* Allow track-click to be customised with a selector

# 6.4.0

* Add `ie9` class to root `<html>` tag when user is using Internet Explorer 9

# 6.3.0

* Add `assets:clobber` placeholder rake task
* Allow setting a class on the root `<html>` tag
* Replace references to design principles style-guide with the new location.
* Add ids to styleguide headings so we can link to them.

# 6.2.0

* Add `GOVUKAdmin.setDimension` to allow setting custom dimensions for GA
* Add `before_pageview_js` content block that is injected into the layout template GA code before we track the page view.  This allows for running more GA code (like setting custom dimensions) before the page view is tracked.
* Add `enable_google_analytics_in_tests` config setting to allow including the GA code block in the layout in Rails test environments.  This allows upstream apps to test any GA code they might include.

# 6.1.0

* Update the jquery-rails dependency to 4.3.1 for compatibility with the latest
version of nokogiri
* Compile test favicon to remove Rails 5.1 asset pipeline fallback deprecation
message

# 6.0.0

* Changes method call from `GOVUKAdmin.trackEvent(action, label, value)` to `GOVUKAdmin.trackEvent(category, action, options)`. Categories are now mandatory. Calls to `GOVUKAdmin.trackEvent` should be changed to use the latest method signature.

# 5.0.1

* Compile correct favicon for production.

# 5.0.0

* Remove `exclude_analytics` content block from template. References to `exclude_analytics` should be removed and replaced with the following config flag.
* Add `disable_google_analytics` to config

# 4.4.2

* Modularize the table-filter markup

# 4.4.1

* Remove default label of `Password` for input fields.

# 4.4.0

* Include optional `simple_form` configuration and locale files

# 4.3.0

* Add Rails 5 compatibility
  https://github.com/alphagov/govuk_admin_template/pull/127

# 4.2.0

* Redact emails from Google Analytics event labels and actions

# 4.1.1

* Add assets initializer to support sprockets-rails >= 3

# 4.1.0

* Allow a custom URL to be sent to Google Analytics using: `content_for :custom_pageview_fullpath, "/custom-path"`
* Fix: Move navbar logic into variable. Fixes a bug where the collapsed nav icon wouldn’t shown when there are no navbar items but there is a sign out link.

# 4.0.1

* Fix environment-label styles for integration #114

# 4.0.0

* Allow environment style and labels to be set to integration. When using integration as the environment style the custom favicon in the application must also be present. eg `favicon-preview.png` must be duplicated as `favicon-integration.png`. #102

# 3.5.0

* Add a govspeak help template
* Improve default indicator styles

# 3.4.0

* Add support for flash messages
* Add optional signout element to navigation bar

# 3.3.2

* Fix module starting when the module is defined on the container passed into `GOVUKAdmin.start` https://github.com/alphagov/govuk_admin_template/pull/98

# 3.3.1

* Prevent GA shim output in test / CI

# 3.3.0

* Add track-click module for Analytics tracking of button clicks

# 3.2.0

* Enable sendBeacon for all admin analytics events

# 3.1.0

* Add checkbox and radio form toggles: https://github.com/alphagov/govuk_admin_template/pull/90

# 3.0.0

* Use GOVUK_APP_DOMAIN environment variable to set Google Analytics domain

# 2.6.0

* Add functions for setting, reading and deleting cookies

# 2.5.1

* Fix inline form rendering in IE7

# 2.5.0

* Allow apps to disable Google Analytics
* Fix table filtering for queries containing special characters

# 2.4.0

* Add a table filter partial for re-use in apps

# 2.3.4

* Improve Bootstrap 3 in IE7

# 2.3.3

* Fix table filtering on tables that contain multiple forms

# 2.3.2

* Make SASS compatible with libsass

# 2.3.1

* Bump version of jquery-rails due to CSRF vulnerability

# 2.3.0

* Allow apps to specify a custom navbar

# 2.2.0

* Add a confirm javascript module for confirming a user action: https://github.com/alphagov/govuk_admin_template/pull/64

# 2.1.0

* Strip off the last octet of IP addresses before sending them to GA

# 2.0.0

* Manage Google Analytics tracking
* Update event and pageview tracking API, deprecate classic GA event tracking

# 1.5.1

* Rename SASS files to exclude `.css` and fix deprecation warnings

# 1.5.0

* Upgrade to Bootstrap 3.3.2

# 1.4.3

* Allow customisation of app's home page

# 1.4.2

* Track events using universal analytics as well as classic analytics

# 1.4.1

* Prevent wrapping of environment label

# 1.4.0

* Upgrade to Bootstrap 3.3

# 1.3.0

* Add 'callout' component

# 1.2.0

* Remove selectable table javascript module

# 1.1.7

* Fix display of `lead` styles when using `text-muted` class
* Add display inline class helpers

# 1.1.6

* Really fix the crown this time (`image-url` requires a gem-relative path)

# 1.1.5

* Move gem management-related rake tasks to ./tasks to avoid breaking consuming
  apps that auto-load tasks from lib/tasks

# 1.1.4

* Fix missing assets in production Rails 4 apps, both our own (header-crown.png)
  and Bootstrap's glyphicon font-using bits

# 1.1.3

* Fix GillSans font stack for IE and Chrome on Windows
* Tweak Bootstrap’s default `lead` styles to be stronger

# 1.1.2

* Add full width page option
* Rename SASS partials to begin with underscores

# 1.1.1

* When filtering tables, allow users to easily go to the first item

# 1.1.0

* Upgrade to JQuery 1.11.1
* Upgrade to Bootstrap 3.2

# 1.0.5

* Tweak to size of inputs when using input helper classes

# 1.0.4

* Fix precompile error with IE7 css

# 1.0.3

* Improve Bootstrap 3 rendering in IE7
* Add helper classes for input widths

# 1.0.2

* Fix rendering of an empty navbar

# 1.0.1

* Fix rendering of media queries in <= IE8
* Add short date and time formats

# 1.0.0

* Create padding and margin mixins, remove silent classes
* Add Bootstrap 2 nav list component
* Correct spacing when using `page-header` class

# 0.1.1

* Fix active visited link styles on bootstrap components
* Fix visited link styles on nested bootstrap components

# 0.1.0

* Environment indicators
* Apps upgrading will need to change how they use favicons

# 0.0.7

* Fix visited link styles on bootstrap components
* Allow content in footer and bottom of page
* Namespace CSS and Javascript files

# 0.0.6

* Add `:govuk_date` date format
* Fix broken footer HTML

# 0.0.5

* Fix gem.files to include all needed files (routes)

# 0.0.4

* Put style guide through parent application controller for accurate rendering

# 0.0.3

* Make style guide available as a mounted route

# 0.0.2

* Add lightweight Javascript framework and modules, ported from Transition

# 0.0.1

* Original gem release including template, styles, jQuery and Bootstrap
