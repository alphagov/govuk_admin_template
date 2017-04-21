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

    it('sends them to Google Analytics', function() {
      GOVUKAdmin.trackEvent('category', 'action', { label: 'label' });
      expect(window.ga.calls.mostRecent().args).toEqual(
        ['send', {
          hitType: 'event',
          eventCategory: 'category',
          eventAction: 'action',
          eventLabel: 'label',
          transport: 'beacon'
        }]
      );
    });

    it('label is optional', function() {
      GOVUKAdmin.trackEvent('category', 'action');
      expect(window.ga.calls.mostRecent().args).toEqual(
        ['send', {
          hitType: 'event',
          eventCategory: 'category',
          eventAction: 'action',
          transport: 'beacon'
        }]
      );
    });

    it('only sends values if they are parseable as numbers', function() {
      GOVUKAdmin.trackEvent('category', 'action', { label: 'label', value: '10' });
      expect(eventObjectFromSpy()['eventValue']).toEqual(10);

      GOVUKAdmin.trackEvent('category', 'action', { label: 'label', value: '10' });
      expect(eventObjectFromSpy()['eventValue']).toEqual(10);

      GOVUKAdmin.trackEvent('category', 'action', { label: 'label', value: 'not a number' });
      expect(eventObjectFromSpy()['eventValue']).toEqual(undefined);
    });

    it('redacts any email addresses accidentally passed in as actions or labels', function() {
      GOVUKAdmin.trackEvent('category', 'this email@email.com is bad', { label: 'and that a@a.co.uk' });
      expect(eventObjectFromSpy()['eventAction']).toEqual('this [email] is bad');
      expect(eventObjectFromSpy()['eventLabel']).toEqual('and that [email]');

      GOVUKAdmin.trackEvent('category', 'email@email.com');
      expect(eventObjectFromSpy()['eventAction']).toEqual('[email]');

      GOVUKAdmin.trackEvent('category', '1@email.com 2@this.com 3@gov.uk 4@business.biz');
      expect(eventObjectFromSpy()['eventAction']).toEqual('[email] [email] [email] [email]');

      GOVUKAdmin.trackEvent('category', '@something @twitterhandle sent to email@email.com @ 2pm');
      expect(eventObjectFromSpy()['eventAction']).toEqual('@something @twitterhandle sent to [email] @ 2pm');
    });
  });
});
