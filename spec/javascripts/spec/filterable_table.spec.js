describe('A filterable table module', function() {
  "use strict";

  var root = window,
      filterableTable,
      tableElement;

  beforeEach(function() {
    tableElement = $('\
      <form>\
        <input type="text" class="js-filter-table-input">\
      </form>\
      <table>\
        <tbody>\
          <tr class="first">\
            <td>something</td>\
          </tr>\
          <tr class="second">\
            <td>another thing</td>\
          </tr>\
        </tbody>\
      </table>\
    ');

    $('body').append(tableElement);
    filterableTable = new GOVUKAdmin.Modules.FilterableTable();
    filterableTable.start(tableElement);
  });

  afterEach(function() {
    tableElement.remove();
  });

  it('filters the table based on input', function() {
    filterBy('another');
    expect(tableElement.find('.first').is(':visible')).toBe(false);
    expect(tableElement.find('.second').is(':visible')).toBe(true);

    filterBy('something');
    expect(tableElement.find('.first').is(':visible')).toBe(true);
    expect(tableElement.find('.second').is(':visible')).toBe(false);

    filterBy('thing');
    expect(tableElement.find('.first').is(':visible')).toBe(true);
    expect(tableElement.find('.second').is(':visible')).toBe(true);

    filterBy('not a thing');
    expect(tableElement.find('.first').is(':visible')).toBe(false);
    expect(tableElement.find('.second').is(':visible')).toBe(false);
  });

  it('shows all rows when no input is entered', function() {
    filterBy('another');
    filterBy('');
    expect(tableElement.find('.first').is(':visible')).toBe(true);
    expect(tableElement.find('.second').is(':visible')).toBe(true);
  });

  function filterBy(value) {
    tableElement.find('input').val(value).trigger('change');
  }

});
