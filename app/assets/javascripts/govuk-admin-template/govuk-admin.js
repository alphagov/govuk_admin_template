(function($, root) {
  "use strict";

  var GOVUKAdmin = root.GOVUKAdmin = {
    Modules: {}
  };

  GOVUKAdmin.find = function(container) {

    var modules,
        moduleSelector = '[data-module]',
        container = container || $('body');

    modules = container.find(moduleSelector);

    // Include container if it matches pattern, as that could
    // be a module too
    if (container.is(moduleSelector)) {
      modules.push(container);
    }

    return modules;
  }

  GOVUKAdmin.start = function(container) {

    var modules = this.find(container);

    for (var i = 0, l = modules.length; i < l; i++) {

      var module,
          element = $(modules[i]),
          type = camelCaseAndCapitalise(element.data('module'));

      if (typeof GOVUKAdmin.Modules[type] === "function") {
        module = new GOVUKAdmin.Modules[type]();
        module.start(element);
      }
    }

    // eg selectable-table to SelectableTable
    function camelCaseAndCapitalise(string) {
      return capitaliseFirstLetter(camelCase(string));
    }

    // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
    function camelCase(string) {
      return string.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    }

    // http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
    function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  }

  GOVUKAdmin.startAll = function() {
    GOVUKAdmin.start();
    GOVUKAdmin.startBootstrapComponents();
  }

  GOVUKAdmin.startBootstrapComponents = function() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  GOVUKAdmin.redirect = function(path) {
    window.location.href = path;
  }

  // Google Analytics event tracking
  // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
  // Label and value are optional
  GOVUKAdmin.track = function(action, label, value) {

    // Default category to the page an event occurs on
    var category = root.location.pathname,
        event;

    // _gaq is the Google Analytics tracking object we
    // push events to, GA asynchronously sends them on
    root._gaq = root._gaq || [];

    event = ["_trackEvent", category, action];

    // Label is optional
    if (typeof label === "string") {
      event.push(label);
    }

    // Value is optional, but when used must be an
    // integer, otherwise the event will be invalid
    // and not logged
    if (value) {
      value = parseInt(value, 10);
      if (typeof value === "number" && !isNaN(value)) {
        event.push(value);
      }
    }

    // Useful for debugging: console.log(event);
    _gaq.push(event);
  }

})(jQuery, window);
