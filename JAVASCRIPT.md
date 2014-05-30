# Admin Javascript

`govuk_admin_template` comes with a lightweight javascript framework that makes it easy to write re-usable modular components, without having to worry about messy instantiation.

## Usage

Javascript modules are specified in markup using `data-` attributes:

```html
<div data-module="some-module">
  <strong>Some other markup inside the module</strong>
</div>
```

When javascript runs on the page the framework will look for a module at `GOVUKAdmin.Modules.SomeModule`. Note the value of the data attribute has been converted to _PascalCase_.

The module will first be instantiated and then will automatically call the module’s `start` method, passing it the element the `data` attribute is on:

```javascript
module = new GOVUKAdmin.Modules[type]();
module.start(element);
```

This automatically limits modules to their containing elements and removes the need for messy inline script tags.

The simplest of modules looks like this:

```javascript
(function(Modules) {
  "use strict";
  Modules.SomeModule = function() {
    var that = this;
    that.start = function(element) {
      // module code
    }
  };
})(window.GOVUKAdmin.Modules);
```

## Writing modules

Whilst this isn’t prescriptive, it helps if modules look and behave in a similar manner. Modules should live within your app’s `app\assets\javascripts\modules` directory.

### Use `js-` prefixed classes for interaction hooks

Make it clear where a javascript module will be applying behaviour:

```html
<div data-module="toggle-thing">
  <a href="/" class="js-toggle">Toggle</a>
  <div class="js-toggle-target">Target</div>
</div>
```

### Declare event listeners at the start

Beginning with a set of event listeners clearly indicates the module’s intentions.

```js
that.start = function(element) {
  element.on('click', '.js-toggle', toggle);
  element.on('click', '.js-cancel', cancel);
}
```

Where possible, assign listeners to the module element to minimise the number of listeners and to allow for flexible markup:

```html
<div data-module="toggle-thing">
  <a href="/" class="js-toggle">This toggles</a>
  <div class="js-toggle-target">
    <p>Some content</p>
    <a href="/" class="js-toggle">This also toggles</a>
  </div>
</div>
```

### Use data-attributes for configuration

Keep modules flexible by moving configuration to data attributes on the module’s element:

```html
<div
  data-module="html-stream"
  data-url="/some/endpoint"
  data-refresh-ms="5000">
  <!-- updates with content from end point -->
</div>
```

### Include Jasmine specs

Modules should have their own tests, whether they’re being included with the gem or are app specific.

## Included modules

Found in the [app/assets/javascripts/modules](app/assets/javascripts/modules) directory, with tests in [spec/javascripts/spec/](spec/javascripts/spec/).

File   | Module | Attribute | Description
------ | ------ | --------- | -----------
auto_show_modal.js | AutoShowModal | auto-show-modal | Initialise a Boostrap modal on page load and remove markup when closed
auto_track_event.js | AutoTrackEvent | auto-track-event | Use data attributes to track events in Google Analytics on page load
filterable_table.js | FilterableTable | filterable-table | Filter the contents of a table, showing only matching rows
fixed_table_header.js | FixedTableHeader | fixed-table-header | Fix the `<thead>` portion of a table when scrolling offscreen
selectable_table.js | SelectableTable | selectable-table | Select rows in a table and perform an action on them
toggle.js | Toggle | toggle | A simple toggle
