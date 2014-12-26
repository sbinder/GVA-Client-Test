(function() {
  this.TXViewController = (function() {
    TXViewController.prototype.API = 'http://localhost:54870/';

    function TXViewController() {
      if (CookieJar.xread()) {
        window.location.replace('index.html');
      }
      $('#ActTel').focus().keypress((function(_this) {
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
      var dat;
      dat = $('form#TX').serialize();
      return $.ajax({
        type: 'POST',
        data: dat,
        url: this.API + 'client/lookupAct/',
        success: (function(_this) {
          return function(data, status, jqxhr) {
            return _this.gotAccount(data);
          };
        })(this)
      });
    };

    TXViewController.prototype.gotAccount = function(data) {
      this.HideAll();
      $('div#current span.val').html(this.Money(data.giftbal));
      $('div#new span.val').html(this.Money(data.giftbal));
      $('div#amount').html(this.Money(0));
      return $('div#GiftCenter').fadeIn(500);
    };

    TXViewController.prototype.LookupTel = function() {};

    TXViewController.prototype.HideAll = function() {
      return $('div#TXCenter').hide();
    };

    TXViewController.prototype.Money = function(mon) {
      var cents, dols, mons;
      dols = '0';
      cents = '00';
      mons = '' + mon;
      if (mons.length < 2) {
        if (mons.length === 1) {
          cents = '0' + mons;
        }
      } else {
        dols = mons.substring(0, mons.length - 2);
        cents = mons.substring(mons.length - 2);
      }
      return "$" + dols + "." + cents;
    };

    return TXViewController;

  })();

  $(function() {
    return new TXViewController;
  });

}).call(this);
