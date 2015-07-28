describe('A filterable table module', function() {
  "use strict";

  var root = window,
      filterableTable,
      tableElement;

  beforeEach(function() {
    tableElement = $('<div>\
      <form>\
        <input type="text" class="js-filter-table-input">\
      </form>\
      <table>\
        <tbody>\
          <tr class="first">\
            <td>\
              <a href="/first-link" class="js-open-on-submit">something</a>\
            </td>\
          </tr>\
          <tr class="second">\
            <td>\
              <a href="/second-link" class="js-open-on-submit">[another thing (^lovely$)]</a>\
            </td>\
          </tr>\
          <tr class="third">\
            <td>\
              <form>\
                <input type="submit" value="Some other form" />\
              </form>\
              ~!@#$%^&*(){}[]`/=?+|-_;:\'",<.>\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>');

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

  it('filters the table based on input even when containing regexp characters', function() {
    filterBy('[another');
    expect(tableElement.find('.first').is(':visible')).toBe(false);
    expect(tableElement.find('.second').is(':visible')).toBe(true);

    filterBy('^lovely');
    expect(tableElement.find('.first').is(':visible')).toBe(false);
    expect(tableElement.find('.second').is(':visible')).toBe(true);

    filterBy('lovely$');
    expect(tableElement.find('.first').is(':visible')).toBe(false);
    expect(tableElement.find('.second').is(':visible')).toBe(true);

    filterBy('~!@#$%^&*(){}[]`/=?+|-_;:\'",<.>');
    expect(tableElement.find('.first').is(':visible')).toBe(false);
    expect(tableElement.find('.second').is(':visible')).toBe(false);
    expect(tableElement.find('.third').is(':visible')).toBe(true);
  });

  it('shows all rows when no input is entered', function() {
    filterBy('another');
    filterBy('');
    expect(tableElement.find('.first').is(':visible')).toBe(true);
    expect(tableElement.find('.second').is(':visible')).toBe(true);
  });

  describe('when the filter form is submitted', function() {
    it('opens the first visible link', function() {
      spyOn(GOVUKAdmin, 'redirect');
      filterBy('another');
      tableElement.find('form').first().trigger('submit');
      expect(GOVUKAdmin.redirect).toHaveBeenCalledWith('/second-link');
    });
  });

  describe('when a form other than the filter is submitted', function() {
    it('does not open the first visible link', function() {
      var submitted = false;
      spyOn(GOVUKAdmin, 'redirect');
      tableElement.find('.third form').on('submit', function(evt) {
        evt.preventDefault();
        submitted = true;
      });

      tableElement.find('.third form').trigger('submit');
      expect(GOVUKAdmin.redirect).not.toHaveBeenCalled();
      expect(submitted).toBe(true);
    });
  });

  function filterBy(value) {
    tableElement.find('input').val(value).trigger('change');
  }

});
