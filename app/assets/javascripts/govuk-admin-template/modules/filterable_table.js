(function(Modules) {
  "use strict";

  Modules.FilterableTable = function() {
    var that = this;
    that.start = function(element) {

      var rows = element.find('tbody tr'),
          tableInput = element.find('.js-filter-table-input'),
          filterForm;

      element.on('keyup change', '.js-filter-table-input', filterTableBasedOnInput);

      if (element.find('a.js-open-on-submit').length > 0) {
        filterForm = tableInput.parents('form');
        if (filterForm && filterForm.length > 0) {
          filterForm.on('submit', openFirstVisibleLink);
        }
      }

      function filterTableBasedOnInput(event) {
        var searchString = $.trim(tableInput.val()),
            regExp = new RegExp(escapeStringForRegexp(searchString), 'i');

        rows.each(function() {
          var row = $(this);
          if (row.text().search(regExp) > -1) {
            row.show();
          } else {
            row.hide();
          }
        });
      }

      function openFirstVisibleLink(evt) {
        evt.preventDefault();
        var link = element.find('a.js-open-on-submit:visible').first();
        GOVUKAdmin.redirect(link.attr('href'));
      }

      // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
      // Escape ~!@#$%^&*(){}[]`/=?+\|-_;:'",<.>
      function escapeStringForRegexp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }
    }
  };

})(window.GOVUKAdmin.Modules);
