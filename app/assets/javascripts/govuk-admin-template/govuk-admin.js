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

  // Google Analytics pageview tracking
  GOVUKAdmin.trackPageview = function(path) {
    if (typeof root.ga === "function") {
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
      root.ga('send', 'pageview', path);
    }
  }

  // Google Analytics event tracking
  // Label and value are optional
  GOVUKAdmin.trackEvent = function(action, label, value) {

    // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
    // Default category to the page an event occurs on
    var eventAnalytics = {
          hitType: 'event',
          eventCategory: root.location.pathname,
          eventAction: action
        };

    // Label is optional
    if (typeof label === "string") {
      eventAnalytics.eventLabel = label;
    }

    // Value is optional, but when used must be an
    // integer, otherwise the event will be invalid
    // and not logged
    if (value) {
      value = parseInt(value, 10);
      if (typeof value === "number" && !isNaN(value)) {
        eventAnalytics.eventValue = value;
      }
    }

    // Useful for debugging:
    // console.log(eventAnalytics);

    if (typeof root.ga === "function") {
      root.ga('send', eventAnalytics);
    }
  }

})(jQuery, window);
