describe('An auto event tracker', function() {
  "use strict";

  var root = window,
      tracker,
      element;

  beforeEach(function() {
    element = $('\
      <div data-track-action="action" data-track-label="label" data-track-value="10">\
      </div>\
    ');

    tracker = new GOVUKAdmin.Modules.AutoTrackEvent();
  });

  it('tracks events on start', function() {
    spyOn(root.GOVUKAdmin, 'trackEvent');
    tracker.start(element);
    expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('action', 'label', 10)
  });
});
