(function(Modules) {
  "use strict";

  Modules.AutoShowModal = function() {
    var that = this;
    that.start = function(element) {
      element.modal('show').on('hidden.bs.modal', function () {
        $(this).remove();
      });
    }
  };

})(window.GOVUKAdmin.Modules);
