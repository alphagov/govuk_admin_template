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
