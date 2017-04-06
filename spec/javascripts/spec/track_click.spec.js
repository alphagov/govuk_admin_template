describe('A click tracker', function() {
  "use strict";

  var root = window,
      tracker,
      element;

  beforeEach(function() {
    tracker = new GOVUKAdmin.Modules.TrackClick();
  });

  describe('with defaults', function() {
    beforeEach(function() {
      element = $('\
        <div>\
          <a class="foo js-track">Foo</a>\
          <a class="bar">Bar</a>\
          <button class="js-track">Qux</button>\
        </div>\
      ');
    });

    it('tracks links with default action and label', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find("a.foo").click();

      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('button-pressed', 'Foo', undefined, undefined);
    });

    it('tracks buttons with default action and label', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find("button").click();
      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('button-pressed', 'Qux', undefined, undefined);
    });

    it('does not track until clicked', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      expect(GOVUKAdmin.trackEvent).not.toHaveBeenCalled();
    });

    it('does not track if not enabled', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find("a.bar").click();
      expect(GOVUKAdmin.trackEvent).not.toHaveBeenCalled();
    });
  });

  describe('with overrides specified', function(){
    beforeEach(function() {
      element = $('\
        <div data-track-action="a-press">\
          <a class="js-track" data-track-label="bar">Foo</a>\
        </div>\
      ');
    });

    it('tracks with supplied action and label', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find("a").click();
      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('a-press', 'bar', undefined, undefined);
    });
  });

  describe('with action, label, value and category specified', function(){
    beforeEach(function() {
      element = $('\
        <div data-track-action="delete-button-click" data-track-category="userInteraction:LLM">\
          <a class="js-track" data-track-label="delete-link">Foo</a>\
        </div>\
      ');
    });

    it('tracks with supplied action and label', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find("a").click();
      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('delete-button-click', 'delete-link', undefined, "userInteraction:LLM");
    });
  });
});
