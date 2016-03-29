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

    // Container could be a module too
    if (container.is(moduleSelector)) {
      modules = modules.add(container);
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
  GOVUKAdmin.trackPageview = function(path, title) {
    var pageviewObject = { page: path };

    if (typeof title === "string") {
      pageviewObject.title = title;
    }

    if (typeof root.ga === "function") {
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
      root.ga('send', 'pageview', pageviewObject);
    }
  }

  // Google Analytics event tracking
  // Label and value are optional
  GOVUKAdmin.trackEvent = function(action, label, value) {

    // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
    // Default category to the page an event occurs on
    // Uses sendBeacon for all events
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#transport
    var eventAnalytics = {
          hitType: 'event',
          transport: 'beacon',
          eventCategory: root.location.pathname,
          eventAction: redactEmails(action)
        };

    // Label is optional
    if (typeof label === "string") {
      eventAnalytics.eventLabel = redactEmails(label);
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

    if (typeof root.ga === "function") {
      root.ga('send', eventAnalytics);
    }

    function redactEmails(string) {
      return string.replace(/\S+@\S+/g, '[email]');
    }
  }

  /*
    Cookie methods
    ==============
    Usage:

      Setting a cookie:
      GOVUKAdmin.cookie('hobnob', 'tasty', { days: 30 });

      Reading a cookie:
      GOVUKAdmin.cookie('hobnob');

      Deleting a cookie:
      GOVUKAdmin.cookie('hobnob', null);
  */
  GOVUKAdmin.cookie = function(name, value, options) {
    if(typeof value !== 'undefined'){
      if(value === false || value === null) {
        return GOVUKAdmin.setCookie(name, '', { days: -1 });
      } else {
        return GOVUKAdmin.setCookie(name, value, options);
      }
    } else {
      return GOVUKAdmin.getCookie(name);
    }
  };

  GOVUKAdmin.setCookie = function(name, value, options) {
    if (typeof options === 'undefined') {
      options = {};
    }
    var cookieString = name + "=" + value + "; path=/";
    if (options.days) {
      var date = new Date();
      date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    if (options.domain) {
      cookieString = cookieString + "; domain=" + options.domain;
    }
    if (document.location.protocol == 'https:'){
      cookieString = cookieString + "; Secure";
    }
    document.cookie = cookieString;
  };

  GOVUKAdmin.getCookie = function(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  };

})(jQuery, window);
