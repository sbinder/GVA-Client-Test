(function() {
  this.TXViewController = (function() {
    TXViewController.prototype.XID = null;

    TXViewController.prototype.OID = null;

    TXViewController.prototype.API = 'http://localhost:54870/';

    function TXViewController() {
      $('#ActTel').keypress((function(_this) {
        return function(event) {
          var regex, str;
          regex = new RegExp("^[a-zA-Z0-9]+$");
          str = String.fromCharCode(event.charCode != null ? event.charCode : event.which);
          if (regex.test(str)) {
            return true;
          }
          event.preventDefault();
          return false;
        };
      })(this));
      $('#lookupAct').click((function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.LookupAct();
        };
      })(this));
      $('#lookupTel').click((function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.LookupTel();
        };
      })(this));
    }

    TXViewController.prototype.LookupAct = function() {
      return $.ajax({
        type: 'GET',
        url: this.API + 'client/lookupAct',
        url: this.API + 'api/initial/' + this.XID,
        success: (function(_this) {
          return function(data, status, jqxhr) {
            return _this.gotInit(data);
          };
        })(this)
      });
    };

    TXViewController.prototype.LookupTel = function() {};

    return TXViewController;

  })();

  $(function() {
    return new TXViewController;
  });

}).call(this);
