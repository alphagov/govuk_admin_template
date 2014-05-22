describe('A selectable table module', function() {
  "use strict";

  var root = window,
      selectableTable,
      table,
      tableRows,
      tableInputs;

  // Bypass jQuery, setting shiftKey on jQuery event didn't pass through as expected
  function simulateShiftClick(element) {
    var evt = document.createEvent('HTMLEvents');

        // See https://developer.mozilla.org/en-US/docs/Web/API/Event.initEvent
        // Event bubbles but is not cancelable
        evt.initEvent('click', true, false);
        evt.shiftKey = true;

    element.dispatchEvent(evt);
  }

  beforeEach(function() {

    table = $('<div>\
      <form>\
        <table>\
          <thead>\
            <tr>\
              <th>\
                <div class="js-submit-container">\
                  <input type="checkbox" class="js-toggle-all disabled" />\
                  <input type="radio" value="type" />\
                  <a href="#" class="js-submit-form" data-type="type">Submit form hook</a>\
                </div>\
              </th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td><input type="checkbox" class="js-toggle-row" /></td>\
            </tr>\
            <tr>\
              <td><input type="checkbox" class="js-toggle-row" /></td>\
            </tr>\
            <tr>\
              <td><input type="checkbox" class="js-toggle-row" /></td>\
            </tr>\
            <tr>\
              <td><input type="checkbox" class="js-toggle-row" /></td>\
            </tr>\
            <tr>\
              <td><input type="checkbox" class="js-toggle-row" /></td>\
            </tr>\
            <tr>\
              <td><input type="checkbox" class="js-toggle-row" /></td>\
            </tr>\
          </tbody>\
        </table>\
      </form>\
    </div>');

    $('body').append(table);

    selectableTable = new GOVUKAdmin.Modules.SelectableTable();
    selectableTable.start(table)

    tableRows = table.find('tbody tr');
    tableInputs = tableRows.find('input');

  });

  afterEach(function() {
    table.remove();
  });

  describe('when the page loads', function() {

    var tableWithSelection;

    beforeEach(function() {

      tableWithSelection = $('<table>\
        <thead>\
          <tr>\
            <th>\
              <div class="js-submit-container">\
                <input type="checkbox" class="js-toggle-all disabled" />\
                <a href="#" class="js-submit-form" data-type="type">Submit form hook</a>\
              </div>\
            </th>\
          </tr>\
        </thead>\
        <tbody>\
          <tr>\
            <td><input type="checkbox" class="js-toggle-row" checked="checked"/></td>\
          </tr>\
          <tr>\
            <td><input type="checkbox" class="js-toggle-row" /></td>\
          </tr>\
        </tbody>\
      </table>');

      $('body').append(tableWithSelection);

      selectableTable = new GOVUKAdmin.Modules.SelectableTable();
      selectableTable.start(tableWithSelection)

    });

    afterEach(function() {
      tableWithSelection.remove();
    });

    it('marks rows as selected if the checkbox is already checked', function() {
      expect(tableWithSelection.find('tr:first-child').is('.selected-row')).toBe(true);
      expect(tableWithSelection.find('tr.selected-row').length).toBe(1);
    });

    it('marks the header checkbox based on the loaded state of the checkboxes', function() {
      expect(tableWithSelection.find('.js-toggle-all').prop('indeterminate')).toBe(true);
      expect(tableWithSelection.find('.js-toggle-all').prop('checked')).toBe(false);
    });

    it('enables the form submit buttons', function() {
      expect(tableWithSelection.find('.js-submit-form.disabled').length).toBe(0);
      expect(tableWithSelection.find('.buttons-enabled').length).toBe(1);
    });

  });

  describe('when no rows are selected and when clicking a submit button hook', function() {

    it('doesn\'t submit the form', function() {

      var formSubmitted = false;

      table.on('submit', function(evt) {
        evt.preventDefault();
        formSubmitted = true;
      });

      table.find('.js-submit-form').click();

      expect(table.find('[value="type"]').prop('checked')).toBe(false);
      expect(formSubmitted).toBe(false);
    });

  });

  describe('when clicking a checkbox on a body row', function() {

    var firstRow,
        firstInput,
        secondInput,
        headerInput;

    beforeEach(function() {
      firstRow = table.find('tbody tr:first-child');
      firstInput = firstRow.find('input');
      secondInput = table.find('tbody tr:first-child + tr input');
      headerInput = table.find('thead input');
    });

    it('toggles the selection', function() {

      firstInput.click();
      expect(firstRow.is('.selected-row')).toBe(true);
      expect(table.find('.selected-row').length).toBe(1);

      firstInput.click();
      expect(firstRow.is('.selected-row')).toBe(false);
    });

    it('updates the header checkbox', function() {

      firstInput.click();
      expect(headerInput.prop('indeterminate')).toBe(true);
      expect(headerInput.prop('checked')).toBe(false);

      firstInput.click();
      table.find('tbody input').each(function() {
        $(this).click();
      });

      expect(headerInput.prop('indeterminate')).toBe(false);
      expect(headerInput.prop('checked')).toBe(true);

      table.find('tbody input').each(function() {
        $(this).click();
      });

      expect(headerInput.prop('indeterminate')).toBe(false);
      expect(headerInput.prop('checked')).toBe(false);
    });

    it('updates the interactive state of the form submit buttons', function() {

      firstInput.click();
      expect(table.find('.js-submit-form.disabled').length).toBe(0);

      firstInput.click();
      expect(table.find('.js-submit-form.disabled').length).toBe(1);

    });

  });

  describe('when a row is shift clicked without any other previous rows being changed', function() {

    it('toggles the row as normal', function() {
      simulateShiftClick(tableInputs.get(1));
      expect(tableRows.eq(1).is('.selected-row')).toBe(true);
    });

  });

  describe('when a row has been selected', function() {

    describe('when another row is selected using the shift key', function() {

      it('selects all rows between the (above) previously changed and the newly changed', function() {

        tableInputs.eq(1).click();
        simulateShiftClick(tableInputs.get(5));

        expect(tableRows.eq(0).is('.selected-row')).toBe(false);
        expect(tableRows.eq(1).is('.selected-row')).toBe(true);
        expect(tableRows.eq(2).is('.selected-row')).toBe(true);
        expect(tableRows.eq(3).is('.selected-row')).toBe(true);
        expect(tableRows.eq(4).is('.selected-row')).toBe(true);
        expect(tableRows.eq(5).is('.selected-row')).toBe(true);
      });

      it('selects all rows between the (below) previously changed and the newly changed', function() {

        tableInputs.eq(5).click();
        simulateShiftClick(tableInputs.get(1));

        expect(tableRows.eq(0).is('.selected-row')).toBe(false);
        expect(tableRows.eq(1).is('.selected-row')).toBe(true);
        expect(tableRows.eq(2).is('.selected-row')).toBe(true);
        expect(tableRows.eq(3).is('.selected-row')).toBe(true);
        expect(tableRows.eq(4).is('.selected-row')).toBe(true);
        expect(tableRows.eq(5).is('.selected-row')).toBe(true);
      });

      it('updates the state of the header toggle', function() {

        tableInputs.eq(0).click();
        simulateShiftClick(tableInputs.get(5));
        expect(table.find('.js-toggle-all').prop('checked')).toBe(true);
      });

    });

    describe('when another row is unselected using the shift key', function() {

      it('unselects all rows between the previously changed and newly changed', function() {

        tableInputs.eq(1).click();
        simulateShiftClick(tableInputs.get(5));
        simulateShiftClick(tableInputs.get(2));

        expect(tableRows.eq(0).is('.selected-row')).toBe(false);
        expect(tableRows.eq(1).is('.selected-row')).toBe(true);
        expect(tableRows.eq(2).is('.selected-row')).toBe(false);
        expect(tableRows.eq(3).is('.selected-row')).toBe(false);
        expect(tableRows.eq(4).is('.selected-row')).toBe(false);
        expect(tableRows.eq(5).is('.selected-row')).toBe(false);

      });

    });

    describe('and when clicking a submit button hook', function() {

      var formSubmitted;

      beforeEach(function() {
        tableInputs.eq(1).click();

        formSubmitted = false;
        table.on('submit', function(evt) {
          evt.preventDefault();
          formSubmitted = true;
        });
      });

      it('selects the correct radio button and submits the form', function() {
        table.find('.js-submit-form').click();

        expect(table.find('[value="type"]').prop('checked')).toBe(true);
        expect(formSubmitted).toBe(true);
      });

      it('disables the submit form buttons to prevent multiple ajax requests', function() {
        table.find('.js-submit-form').click();
        expect(table.find('.js-submit-form.disabled').length).toBe(1);
        expect(table.find('.buttons-enabled').length).toBe(0);
      });

    });

  });

  describe('when clicking the checkbox in the header', function() {

    var headerInput,
        rows;

    beforeEach(function() {
      headerInput = table.find('thead input');
      rows = table.find('tbody tr');
    });

    describe('when some inputs are already selected', function() {

      beforeEach(function() {
        table.find('tbody tr').first().addClass('selected-row').find('input').prop('checked', true);
        headerInput.click();
      });

      it('selects all rows', function() {
        expect(table.find('.selected-row').length).toBe(rows.length);
        expect(table.find('.selected-row input:checked').length).toBe(rows.length);
      });

      it('checks the header checkbox', function() {
        expect(headerInput.prop('checked')).toBe(true);
      });

    });

    describe('when no inputs are selected', function() {

      beforeEach(function() {
        headerInput.click();
      });

      it('selects all rows', function() {
        expect(table.find('.selected-row').length).toBe(rows.length);
        expect(table.find('.selected-row input:checked').length).toBe(rows.length);
      });

      it('checks the header checkbox', function() {
        expect(headerInput.prop('checked')).toBe(true);
      });

    });

    describe('when all inputs are selected', function() {

      beforeEach(function() {
        table.find('tbody tr').addClass('selected-row').find('input').prop('checked', true);
        headerInput.click();
      });

      it('unselects all rows', function() {
        expect(table.find('.selected-row').length).toBe(0);
        expect(table.find('tbody input:checked').length).toBe(0);
      });

      it('unchecks the header checkbox', function() {
        expect(headerInput.prop('checked')).toBe(false);
      });

    });

  });

  describe('when the rails ajax response successfully returns', function() {

    beforeEach(function() {
      table.find('form').trigger('ajax:success', '<div class="returned-content"></div>');
      table.find('form').trigger('ajax:complete');
    });

    afterEach(function() {
      $('body').find('.returned-content').remove();
    });

    it('appends the returned HTML to the body', function() {
      expect($('body').find('.returned-content').length).toBe(1);
    });

    it('re-enables the submit form buttons', function() {
      expect(table.find('.js-submit-form.disabled').length).toBe(0);
    });

  });

  describe('when the rails ajax response errors', function() {

    beforeEach(function() {
      spyOn(window, 'alert');
      table.find('form').trigger('ajax:error');
      table.find('form').trigger('ajax:complete');
    });

    it('sends an alert message', function() {
      expect(window.alert).toHaveBeenCalled();
    });

    it('re-enables the submit form buttons', function() {
      expect(table.find('.js-submit-form.disabled').length).toBe(0);
    });

  });


});
