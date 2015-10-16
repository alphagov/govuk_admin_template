describe('A radio toggle module', function() {
  "use strict";

  var root = window,
      toggle,
      element;

  beforeEach(function() {
    element = $('<div>\
      <label>\
        <input type="radio" name="group" class="radio-1" data-target="radio-1-target"> Radio 1\
      </label>\
      <div id="radio-1-target"></div>\
      <label>\
        <input type="radio" name="group" class="radio-2" data-target="radio-2-target"> Radio 2\
      </label>\
      <div id="radio-2-target"></div>\
      <label>\
        <input type="radio" name="group" class="radio-3"> Radio 3\
      </label>\
    </div>');

    toggle = new GOVUKAdmin.Modules.RadioToggle();
    $('body').append(element);
  });

  afterEach(function() {
    element.remove();
  });

  describe('when starting', function() {
    it('hides content if not selected', function() {
      toggle.start(element);
      expectToggleToBeHidden('#radio-1-target');
    });

    it('shows content if selected', function() {
      toggleRadio('.radio-1');
      toggle.start(element);
      expectToggleToBeVisible('#radio-1-target');
    });

    it('adds an `aria-controls` attribute linking radio to each target', function() {
      toggle.start(element);
      var $ariaControls = element.find('input[type="radio"][data-target]');
      expect($ariaControls.eq(0).attr('aria-controls')).toBe('radio-1-target');
      expect($ariaControls.eq(1).attr('aria-controls')).toBe('radio-2-target');
    });
  });

  it('toggles content when radio values change', function() {
    toggle.start(element);

    expectToggleToBeHidden('#radio-1-target');
    expectToggleToBeHidden('#radio-2-target');

    toggleRadio('.radio-1');
    expectToggleToBeVisible('#radio-1-target');
    expectToggleToBeHidden('#radio-2-target');

    toggleRadio('.radio-2');
    expectToggleToBeHidden('#radio-1-target');
    expectToggleToBeVisible('#radio-2-target');

    toggleRadio('.radio-3');
    expectToggleToBeHidden('#radio-1-target');
    expectToggleToBeHidden('#radio-2-target');
  });

  it('can handle multiple radio groups with toggles', function() {
    element.append('<div>\
      <label>\
        <input type="radio" name="another-group" class="radio-4" data-target="radio-4-target"> Radio 4\
      </label>\
      <div id="radio-4-target"></div>\
      <label>\
        <input type="radio" name="another-group" class="radio-5"> Radio 5\
      </label>\
    </div>');

    toggle.start(element);

    expectToggleToBeHidden('#radio-1-target');
    expectToggleToBeHidden('#radio-2-target');
    expectToggleToBeHidden('#radio-4-target');

    toggleRadio('.radio-1');
    toggleRadio('.radio-4');
    expectToggleToBeVisible('#radio-1-target');
    expectToggleToBeVisible('#radio-4-target');

    toggleRadio('.radio-2');
    expectToggleToBeHidden('#radio-1-target');
    expectToggleToBeVisible('#radio-2-target');
    expectToggleToBeVisible('#radio-4-target');

    toggleRadio('.radio-3');
    expectToggleToBeHidden('#radio-1-target');
    expectToggleToBeHidden('#radio-2-target');
    expectToggleToBeVisible('#radio-4-target');
  });

  function toggleRadio(selector) {
    element.find(selector).click();
  }

  function expectToggleToBeVisible(id) {
    expect(element.find(id).is(':visible')).toBe(true);
    expect(element.find(id).attr('aria-hidden')).toBe('false');
  }

  function expectToggleToBeHidden(id) {
    expect(element.find(id).is(':visible')).toBe(false);
    expect(element.find(id).attr('aria-hidden')).toBe('true');
  }
});
