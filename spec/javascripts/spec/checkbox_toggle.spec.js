describe('A checkbox toggle module', function() {
  "use strict";

  var root = window,
      toggle,
      toggleElement;

  beforeEach(function() {
    toggleElement = $('<div>\
      <label>\
        <input type="checkbox" class="without-target"> Normal checkbox\
      </label>\
      <label>\
        <input type="checkbox" data-target="target-id" class="with-target"> Check me\
      </label>\
      <div id="target-id">Content</div>\
    ');

    toggle = new GOVUKAdmin.Modules.CheckboxToggle();
    $('body').append(toggleElement);
  });

  afterEach(function() {
    toggleElement.remove();
  });

  describe('when starting', function() {
    it('hides content if unchecked', function() {
      toggle.start(toggleElement);

      expectToggleToBeHidden();
      toggleCheckbox();
      expectToggleToBeVisible();
    });

    it('shows content if checked', function() {
      toggleCheckbox();
      toggle.start(toggleElement);

      expectToggleToBeVisible();
      toggleCheckbox();
      expectToggleToBeHidden();
    });

    it('adds an `aria-controls` attribute linking checkbox to target', function() {
      toggle.start(toggleElement);
      var ariaControls = toggleElement.find('input[type="checkbox"][data-target]').attr('aria-controls');
      expect(ariaControls).toBe('target-id');
    });
  });

  it('toggles content when checkbox with a target changes', function() {
    toggle.start(toggleElement);

    expectToggleToBeHidden();
    toggleCheckbox();
    expectToggleToBeVisible();
    toggleCheckbox();
    expectToggleToBeHidden();
  });

  it('does nothing when a checkbox without a target changes', function() {
    toggle.start(toggleElement);

    expectToggleToBeHidden();
    toggleElement.find('.without-target').click();
    expectToggleToBeHidden();
    toggleElement.find('.without-target').click();
    expectToggleToBeHidden();
  });

  it('can handle multiple checkboxes with toggles', function() {
    toggleElement.find('div').append('\
      <label>\
        <input type="checkbox" data-target="second-target-id" class="second-with-target"> Check me\
      </label>\
      <div id="second-target-id">Content</div>\
    ');
    toggle.start(toggleElement);

    expectToggleToBeHidden();
    expectToggleToBeHidden('#second-target-id');
    toggleCheckbox();
    expectToggleToBeVisible();
    expectToggleToBeHidden('#second-target-id');
    toggleCheckbox('.second-with-target');
    expectToggleToBeVisible();
    expectToggleToBeVisible('#second-target-id');
  });

  function toggleCheckbox(selector) {
    selector = selector || '.with-target';
    toggleElement.find(selector).click();
  }

  function expectToggleToBeVisible(id) {
    id = id || '#target-id';

    expect(toggleElement.find(id).is(':visible')).toBe(true);
    expect(toggleElement.find(id).attr('aria-hidden')).toBe('false');
  }

  function expectToggleToBeHidden(id) {
    id = id || '#target-id';

    expect(toggleElement.find(id).is(':visible')).toBe(false);
    expect(toggleElement.find(id).attr('aria-hidden')).toBe('true');
  }

});
