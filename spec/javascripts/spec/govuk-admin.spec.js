describe('A GOVUKAdmin app', function() {
  "use strict";

  var GOVUKAdmin = window.GOVUKAdmin;

  it('finds modules', function() {

    var module = $('<div data-module="a-module"></div>');
    $('body').append(module);

    expect(GOVUKAdmin.find().length).toBe(1);
    expect(GOVUKAdmin.find().eq(0).data('module')).toBe('a-module');

    module.remove();
  });

  it('finds modules in a container', function() {

    var module = $('<div data-module="a-module"></div>'),
        container = $('<div></div>').append(module);

    expect(GOVUKAdmin.find(container).length).toBe(1);
    expect(GOVUKAdmin.find(container).eq(0).data('module')).toBe('a-module');
  });

  it('finds modules that are a container', function() {

    var module = $('<div data-module="a-module"></div>'),
        container = $('<div data-module="container-module"></div>').append(module);

    expect(GOVUKAdmin.find(container).length).toBe(2);
    expect(GOVUKAdmin.find(container).eq(0).data('module')).toBe('container-module');
    expect(GOVUKAdmin.find(container).eq(1).data('module')).toBe('a-module');
  });

  describe('when manipulating cookies', function() {
    it('can set, retrieve and delete a cookie', function() {
      GOVUKAdmin.cookie('name', 'value');
      expect(GOVUKAdmin.cookie('name')).toBe('value');
      expect(document.cookie).toBe('name=value');

      GOVUKAdmin.cookie('name', null);
      expect(document.cookie).toBe('');
      expect(GOVUKAdmin.cookie('name')).toBe(null);
    });

    it('can set an expires on a cookie', function() {
      GOVUKAdmin.cookie('expiring', 'cookie', {days: 5});
      expect(GOVUKAdmin.cookie('expiring')).toBe('cookie');
      expect(document.cookie).toBe('expiring=cookie');

      GOVUKAdmin.cookie('expiring', null);
    });
  });

  describe('when a module exists', function() {

    var callback;

    beforeEach(function() {
      callback = jasmine.createSpy();
      GOVUKAdmin.Modules.TestAlertModule = function() {
        var that = this;
        that.start = function(element) {
          callback(element);
        }
      };
    });

    afterEach(function() {
      delete GOVUKAdmin.Modules.TestAlertModule;
    });

    it('starts modules within a container', function() {
      var module = $('<div data-module="test-alert-module"></div>'),
          container = $('<div></div>').append(module);

      GOVUKAdmin.start(container);
      expect(callback).toHaveBeenCalled();
    });

    it('passes the HTML element to the module\'s start method', function() {
      var module = $('<div data-module="test-alert-module"></div>'),
          container = $('<div></div>').append(module);

      GOVUKAdmin.start(container);

      var args = callback.calls.argsFor(0);
      expect(args[0].is('div[data-module="test-alert-module"]')).toBe(true);
    });

    it('starts all modules that are on the page', function() {
      var modules = $(
            '<div data-module="test-alert-module"></div>\
             <strong data-module="test-alert-module"></strong>\
             <script data-module="test-alert-module"></script>'
          );

      $('body').append(modules);
      GOVUKAdmin.startAll();
      expect(callback.calls.count()).toBe(3);

      // Tear down
      modules.remove();
    });
  });

  describe('when starting analytics', function() {
    beforeEach(function() {
      window.ga = function() {};
      spyOn(window, 'ga');
    });

    it('configures the profile', function() {
      GOVUKAdmin.startAnalytics('UA-XXX', 'cookieDomain');
      expect(window.ga.calls.argsFor(0)).toEqual(['create', 'UA-XXX', {'cookieDomain': 'cookieDomain'}]);
      expect(window.ga.calls.argsFor(1)).toEqual(['set', 'anonymizeIp', true]);
    });

    it('tracks the current page', function() {
      GOVUKAdmin.startAnalytics('UA-XXX', 'cookieDomain');
      expect(window.ga.calls.mostRecent().args).toEqual(['send', 'pageview']);
    });
  });

  describe('when pageviews are tracked', function() {
    beforeEach(function() {
      window.ga = function() {};
      spyOn(window, 'ga');
    });

    it('sends them to Google Analytics', function() {
      GOVUKAdmin.trackPageview('/nicholas-page');
      expect(window.ga.calls.mostRecent().args).toEqual(['send', 'pageview', {page: '/nicholas-page'}]);
    });

    it('can track a custom title', function() {
      GOVUKAdmin.trackPageview('/nicholas-page', 'Nicholas Page');
      expect(window.ga.calls.mostRecent().args).toEqual(['send', 'pageview', {page: '/nicholas-page', title: 'Nicholas Page'}]);
    });
  });

  describe('when events are tracked', function() {

    beforeEach(function() {
      window.ga = function() {};
      spyOn(window, 'ga');
    });

    function eventObjectFromSpy() {
      return window.ga.calls.mostRecent().args[1];
    }

    it('uses the current path as the category', function() {
      GOVUKAdmin.trackEvent('action', 'label');
      expect(eventObjectFromSpy()['eventCategory']).toBe('/');
    });

    it('sends them to Google Analytics', function() {
      GOVUKAdmin.trackEvent('action', 'label');
      expect(window.ga.calls.mostRecent().args).toEqual(
        ['send', {
          hitType: 'event',
          eventCategory: '/',
          eventAction: 'action',
          eventLabel: 'label',
          transport: 'beacon'
        }]
      );
    });

    it('label is optional', function() {
      GOVUKAdmin.trackEvent('action');
      expect(window.ga.calls.mostRecent().args).toEqual(
        ['send', {
          hitType: 'event',
          eventCategory: '/',
          eventAction: 'action',
          transport: 'beacon'
        }]
      );
    });

    it('only sends values if they are parseable as numbers', function() {
      GOVUKAdmin.trackEvent('action', 'label', '10');
      expect(eventObjectFromSpy()['eventValue']).toEqual(10);

      GOVUKAdmin.trackEvent('action', 'label', 10);
      expect(eventObjectFromSpy()['eventValue']).toEqual(10);

      GOVUKAdmin.trackEvent('action', 'label', 'not a number');
      expect(eventObjectFromSpy()['eventValue']).toEqual(undefined);
    });
  });
});
