describe('A confirm module', function() {
  "use strict";

  var confirm,
      element,
      prevented;

  beforeEach(function() {
    element = $('<a href="#" data-message="some message">Link</a>');
    parent = $('<div></div>');
    parent.append(element);
    confirm = new GOVUKAdmin.Modules.Confirm();
    confirm.start(element);

    prevented = undefined;
    parent.on('click', 'a', function(event) {
      prevented = event.isDefaultPrevented();
    });
  });

  describe('when clicking a confirm link', function() {

    it('asks a question before continuing', function() {
      spyOn(window, 'confirm');
      element.trigger('click');
      expect(window.confirm).toHaveBeenCalledWith('some message');
    });

    describe('when confirming', function() {
      it('continues loading the requested link', function() {
        spyOn(window, 'confirm').and.returnValue(true);
        element.trigger('click');
        expect(prevented).toBe(false);
      });
    });

    describe('when cancelling', function() {
      it('stops loading the requested link', function() {
        spyOn(window, 'confirm').and.returnValue(false);
        element.trigger('click');
        expect(prevented).toBe(true);
      });
    });
  });
});
