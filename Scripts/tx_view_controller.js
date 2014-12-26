(function() {
  var TXViewController,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  TXViewController = (function() {
    TXViewController.prototype.API = 'http://localhost:54870/';

    TXViewController.prototype.transaction = 0;

    TXViewController.prototype.balance = 0;

    TXViewController.prototype.direction = -1;

    function TXViewController() {
      this.GotTXKey = __bind(this.GotTXKey, this);
      this.ShowTX = __bind(this.ShowTX, this);
      $('body').keydown((function(_this) {
        return function(event) {
          if ($('div#GiftCenter').is(':visible')) {
            return _this.GotTXKey(event);
          }
        };
      })(this));
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
      this.balance = data.giftbal;
      this.transaction = 0;
      $('div#current span.val').html(this.Money(this.balance));
      this.ShowTX();
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
        if (dols.length === 0) {
          dols = '0';
        }
        cents = mons.substring(mons.length - 2);
      }
      return "$" + dols + "." + cents;
    };

    TXViewController.prototype.ShowTX = function() {
      $('div#amount').html(this.Money(this.transaction));
      return $('div#new span.val').html(this.Money(this.balance + (this.transaction * this.direction)));
    };

    TXViewController.prototype.GotTXKey = function(event) {
      var oldTX, regex, str, ts;
      oldTX = this.transaction;
      regex = new RegExp("^[0-9]+$");
      str = String.fromCharCode(event.which);
      if (regex.test(str)) {
        this.transaction *= 10;
        this.transaction += parseInt(str);
      }
      if (event.which === 8 || event.which === 46) {
        ts = '' + this.transaction;
        if (ts.length > 1) {
          this.transaction = parseInt(ts.substring(0, -1 + ts.length));
        } else {
          this.transaction = 0;
        }
      }
      if (this.balance + (this.transaction * this.direction) < 0) {
        this.transaction = oldTX;
      }
      return this.ShowTX();
    };

    return TXViewController;

  })();

  $(function() {
    return new TXViewController;
  });

}).call(this);
