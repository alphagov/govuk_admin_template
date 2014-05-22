(function(Modules) {
  "use strict";

  Modules.FilterableTable = function() {
    var that = this;
    that.start = function(element) {

      var rows = element.find('tbody tr'),
          tableInput = element.find('.js-filter-table-input');

      element.on('keyup change', '.js-filter-table-input', filterTableBasedOnInput);

      function filterTableBasedOnInput(event) {
        var searchString = $.trim(tableInput.val()),
            regExp = new RegExp(searchString, 'i');

        rows.each(function() {
          var row = $(this);
          if (row.text().search(regExp) > -1) {
            row.show();
          } else {
            row.hide();
          }
        });
      }
    }
  };

})(window.GOVUKAdmin.Modules);
