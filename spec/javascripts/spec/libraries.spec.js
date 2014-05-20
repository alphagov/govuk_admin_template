describe('Libraries', function() {
  "use strict";

  it('includes jQuery' , function() {
    expect(typeof $.fn.jquery).toBe("string");
  });
});
