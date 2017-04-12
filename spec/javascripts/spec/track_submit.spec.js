describe('A form submit tracker', function() {
  "use strict";

  var root = window,
    tracker,
    element;

  beforeEach(function() {
    tracker = new GOVUKAdmin.Modules.TrackSubmit();
  });

  describe('with defaults', function() {
    beforeEach(function() {
      element = $('\
        <div \
          data-track-action="form-submitted"\
          data-track-label= "edit-link">\
          <form method="post">\
            <button type="submit">Submit</button>\
          </form>\
        </div>\
      ');
    });

    it('tracks submit events with default category and action', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find('form').trigger('submit');
      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('form-submitted', 'edit-link', undefined, undefined);
    });

    it('does not track until submitted', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      expect(GOVUKAdmin.trackEvent).not.toHaveBeenCalled();
    });
  });

  describe('with overrides specified', function(){
    beforeEach(function() {
      element = $('\
        <div \
          data-track-action="form-submitted"\
          data-track-label= "edit-link"\
          data-track-category="userInteraction:LLM">\
          <form method="post">\
            <button type="submit">Submit</button>\
          </form>\
        </div>\
      ');
    });

    it('tracks with supplied action, label, value and category', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find('form').trigger('submit');
      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('form-submitted', 'edit-link', undefined, "userInteraction:LLM");
    });
  });

  describe('with action, label, value and category specified', function(){
    beforeEach(function() {
      element = $('\
        <div \
          data-track-action="form-submitted"\
          data-track-label= "edit-link"\
          data-track-value= "link1"\
          data-track-category="userInteraction:LLM">\
          <form method="post">\
            <button type="submit">Submit</button>\
          </form>\
        </div>\
      ');
    });

    it('tracks with supplied action and label', function() {
      spyOn(root.GOVUKAdmin, 'trackEvent');
      tracker.start(element);
      element.find('form').trigger('submit');
      expect(GOVUKAdmin.trackEvent).toHaveBeenCalledWith('form-submitted', 'edit-link', "link1", "userInteraction:LLM");
    });
  });
});
