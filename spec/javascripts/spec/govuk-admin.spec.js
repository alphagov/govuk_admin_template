describe('A GOVUKAdmin app', function() {
  "use strict";

  var GOVUKAdmin = window.GOVUKAdmin;

  it('finds modules', function() {

    var module = $('<div data-module="a-module"></div>');
    $('body').append(module);

    expect(GOVUKAdmin.find().length).toBe(1);
    expect(GOVUKAdmin.find()[0]).toMatch(module);

    module.remove();
  });

  it('finds modules in a container', function() {

    var module = $('<div data-module="a-module"></div>'),
        container = $('<div></div>').append(module);

    expect(GOVUKAdmin.find(container).length).toBe(1);
    expect(GOVUKAdmin.find(container)[0]).toMatch(module);
  });

  it('finds modules that are a container', function() {

    var module = $('<div data-module="a-module"></div>'),
        container = $('<div data-module="container-module"></div>').append(module);

    expect(GOVUKAdmin.find(container).length).toBe(2);
    expect(GOVUKAdmin.find(container)[1]).toMatch(container);
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
      expect(args[0]).toMatch(module);
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

  describe('when events are tracked', function() {

    beforeEach(function() {
      window._gaq = [];
      window.ga = function() {};
      spyOn(window, 'ga');
    });

    function eventObjectFromSpy() {
      return window.ga.calls.mostRecent().args[1];
    }

    it('uses the current path as the category', function() {
      GOVUKAdmin.track('action', 'label');
      expect(window._gaq[0][1]).toEqual('/');
      expect(eventObjectFromSpy()['eventCategory']).toBe('/');
    });

    it('sends them to Google Analytics', function() {
      GOVUKAdmin.track('action', 'label');
      expect(window._gaq).toEqual([['_trackEvent', '/', 'action', 'label']]);
      expect(window.ga.calls.mostRecent().args).toEqual(
        ['send', {hitType: 'event', eventCategory: '/', eventAction: 'action', eventLabel: 'label'}]
      );
    });

    it('creates a _gaq object when one isn\'t already present', function() {
      delete window._gaq;
      GOVUKAdmin.track('action');
      expect(window._gaq).toEqual([['_trackEvent', '/', 'action']]);
    });

    it('label is optional', function() {
      GOVUKAdmin.track('action');
      expect(window._gaq).toEqual([['_trackEvent', '/', 'action']]);
      expect(window.ga.calls.mostRecent().args).toEqual(
        ['send', {hitType: 'event', eventCategory: '/', eventAction: 'action'}]
      );
    });

    it('only sends values if they are parseable as numbers', function() {
      GOVUKAdmin.track('action', 'label', '10');
      expect(window._gaq[0]).toEqual(['_trackEvent', '/', 'action', 'label', 10]);
      expect(eventObjectFromSpy()['eventValue']).toEqual(10);

      GOVUKAdmin.track('action', 'label', 10);
      expect(window._gaq[1]).toEqual(['_trackEvent', '/', 'action', 'label', 10]);
      expect(eventObjectFromSpy()['eventValue']).toEqual(10);

      GOVUKAdmin.track('action', 'label', 'not a number');
      expect(window._gaq[2]).toEqual(['_trackEvent', '/', 'action', 'label']);
      expect(eventObjectFromSpy()['eventValue']).toEqual(undefined);
    });
  });
});
