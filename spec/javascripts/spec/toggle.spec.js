describe('A toggle module', function() {
  "use strict";

  var root = window,
      toggle,
      toggleElement;

  beforeEach(function() {
    toggleElement = $('\
      <div>\
        <a href="#" class="js-toggle">Toggle</a>\
        <span class="js-toggle-target"></span>\
        <strong class="js-toggle-target if-js-hide"></strong>\
      </div>\
    ');

    toggle = new GOVUKAdmin.Modules.Toggle();
    toggle.start(toggleElement);
  });

  it('toggles elements denoted as a target', function() {
    expect(toggleElement.find('strong.if-js-hide').length).toBe(1);
    expect(toggleElement.find('span.if-js-hide').length).toBe(0);

    toggleElement.find('.js-toggle').click();

    expect(toggleElement.find('strong.if-js-hide').length).toBe(0);
    expect(toggleElement.find('span.if-js-hide').length).toBe(1);
  });
});
