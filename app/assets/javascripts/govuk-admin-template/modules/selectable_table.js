(function(Modules) {
  "use strict";

  Modules.SelectableTable = function() {

    var that = this;

    that.start = function(element) {

      var tableRows = element.find('tbody tr'),
          SELECTED_ROW_CLASS = 'selected-row',
          RECENTLY_CHANGED_CLASS = 'js-most-recently-changed';

      element.on('click', '.js-toggle-row',  toggleRow);
      element.on('click', '.js-toggle-all',  toggleAllRows);
      element.on('click', '.js-submit-form', submitForm);

      element.on('ajax:success', 'form', createModal);
      element.on('ajax:error',   'form', handleModalError);
      element.on('ajax:complete','form', resetSubmitButtons);

      onLoadMarkSelectedRowsWithClass();
      updateHeaderToggleState();

      function onLoadMarkSelectedRowsWithClass() {

        var selectedRows = tableRows.find('.js-toggle-row:checked').parents('tr');
        selectedRows.addClass(SELECTED_ROW_CLASS);

      }

      function toggleRow(event) {

        var row = $(event.target).parents('tr');

        event.shiftKey ? shiftToggleRow(row) : row.toggleClass(SELECTED_ROW_CLASS);

        markRowAsRecentlyChanged(row);
        updateHeaderToggleState();
      }

      function updateHeaderToggleState() {

        var selectedRowsCount = tableRows.filter('.' + SELECTED_ROW_CLASS).length,
            inputHeader = element.find('.js-toggle-all');

        if (selectedRowsCount > 0 && selectedRowsCount < tableRows.length) {
          inputHeader.prop('indeterminate', true);
          inputHeader.prop('checked', false);
          resetSubmitButtons();
        } else if (selectedRowsCount === 0) {
          inputHeader.prop('checked', false);
          inputHeader.prop('indeterminate', false);
          disableSubmitButtons();
        } else {
          inputHeader.prop('checked', true);
          inputHeader.prop('indeterminate', false);
          resetSubmitButtons();
        }

      }

      function markRowAsRecentlyChanged(row) {
        tableRows.removeClass(RECENTLY_CHANGED_CLASS);
        row.addClass(RECENTLY_CHANGED_CLASS);
      }

      function shiftToggleRow(targetRow) {

        var targetIndex = tableRows.index(targetRow),
            targetState = targetRow.is('.' + SELECTED_ROW_CLASS),
            mostRecentlyChanged = tableRows.filter('.' + RECENTLY_CHANGED_CLASS),
            mostRecentlyChangedIndex = tableRows.index(mostRecentlyChanged),
            rows, range;

        // If we don't have a most recently changed, only toggle the current row
        if (mostRecentlyChangedIndex < 0) {
          mostRecentlyChangedIndex = targetIndex;
        }

        range = mostRecentlyChangedIndex < targetIndex ? [mostRecentlyChangedIndex, targetIndex + 1] : [targetIndex, mostRecentlyChangedIndex + 1];
        rows = tableRows.slice.apply(tableRows, range);
        toggleRows(rows, ! targetState);

      }

      function toggleAllRows(event) {

        var rows = element.find('tbody tr');

        // If everything selected
        if (tableRows.length == element.find('.' + SELECTED_ROW_CLASS).length) {
          toggleRows(rows, false);
        } else {
          toggleRows(rows, true);
        }

        updateHeaderToggleState();
      }

      function toggleRows(rows, select) {
        if (select) {
          rows.addClass(SELECTED_ROW_CLASS)
        } else {
          rows.removeClass(SELECTED_ROW_CLASS)
        }
        rows.find('input').prop('checked', select);
      }

      function submitForm(event) {
        var target = $(event.target),
            type = target.data('type');

        if (target.is('.disabled')) {
          event.preventDefault();
          return;
        }

        disableSubmitButtons();
        target.button('loading');

        element.find('input[type="radio"][value="' + type + '"]').prop('checked', true);
        element.find('form').submit();
        event.preventDefault();
      }

      function createModal(event, html, status) {
        var modal = $(html);

        $('body').append(modal);

        modal.modal('show').on('hidden.bs.modal', function () {
          modal.remove();
        });

        GOVUKAdmin.start(modal);
      }

      function handleModalError(xhr, status, error) {
        alert('There was a problem loading this. Please try again.');
      }

      function resetSubmitButtons() {
        element.find('.js-submit-form').removeClass('disabled').button('reset');
        element.find('.js-submit-container').addClass('buttons-enabled');
      }

      function disableSubmitButtons() {
        element.find('.js-submit-form').addClass('disabled');
        element.find('.js-submit-container').removeClass('buttons-enabled');
      }
    }
  };
})(window.GOVUKAdmin.Modules);
