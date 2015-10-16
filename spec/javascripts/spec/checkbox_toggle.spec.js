describe('A checkbox toggle module', function() {
  "use strict";

  var root = window,
      toggle,
      toggleElement;

  beforeEach(function() {
    toggleElement = $('<div data-target="target-id">\
      <label>\
        <input type="checkbox"> Check me\
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
      var ariaControls = toggleElement.find('input[type="checkbox"]').attr('aria-controls');
      expect(ariaControls).toBe('target-id');
    });
  });

  it('toggles content when checkbox changes', function() {
    toggle.start(toggleElement);

    expectToggleToBeHidden();
    toggleCheckbox();
    expectToggleToBeVisible();
    toggleCheckbox();
    expectToggleToBeHidden();
  });

  function toggleCheckbox() {
    toggleElement.find('input[type="checkbox"]').click();
  }

  function expectToggleToBeVisible() {
    expect(toggleElement.find('#target-id').is(':visible')).toBe(true);
    expect(toggleElement.find('#target-id').attr('aria-hidden')).toBe('false');
  }

  function expectToggleToBeHidden() {
    expect(toggleElement.find('#target-id').is(':visible')).toBe(false);
    expect(toggleElement.find('#target-id').attr('aria-hidden')).toBe('true');
  }

});
