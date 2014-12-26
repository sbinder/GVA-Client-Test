(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.IndexViewController = (function() {
    IndexViewController.prototype.API = 'http://localhost:54870/';

    function IndexViewController() {
      this.SigninAuth = __bind(this.SigninAuth, this);
      this.initialAuth = __bind(this.initialAuth, this);
      this.hideAll();
      CookieJar.xread();
      $('#signinForm input[type="submit"]').click((function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.SignIn();
        };
      })(this));
      if ($('#XID').val() !== '') {
        this.initialAuth();
      } else {
        window.location.replace('register.html');
      }
    }

    IndexViewController.prototype.initialAuth = function() {
      if ($('#XID').val() === '') {
        return;
      }
      this.showConnecting();
      return $.ajax({
        type: 'GET',
        url: this.API + 'client/initial/' + $('#XID').val(),
        success: (function(_this) {
          return function(data, status, jqxhr) {
            return _this.gotInit(data);
          };
        })(this)
      });
    };

    IndexViewController.prototype.SigninAuth = function() {
      var dat;
      dat = $('form#signinForm').serialize();
      if ($('#XID').val() === '') {
        return;
      }
      this.showConnecting();
      return $.ajax({
        type: 'POST',
        url: this.API + 'client/authenticate',
        data: dat,
        success: (function(_this) {
          return function(data, status, jqxhr) {
            return _this.gotLogin(data);
          };
        })(this)
      });
    };

    IndexViewController.prototype.gotLogin = function(data) {
      CookieJar.xwrite(data.Token, data.Auth);
      return window.location.replace('tx.html');
    };

    IndexViewController.prototype.gotInit = function(data) {
      var d;
      this.hideAll();
      d = data.Token;
      CookieJar.write('xid', d);
      if (d === '0') {
        window.location.replace('register.html');
        return;
      }
      if (d === '1') {
        $('input#username').val("Demonstration").attr("readonly", "readonly");
        $('input#password').val("Demonstration").attr("readonly", "readonly");
      }
      if (d === '1' || d.length > 12) {
        $('#XID').val(d);
        return $('div#Signin').fadeIn();
      }
    };

    IndexViewController.prototype.hideAll = function() {
      $('div#connecting').hide();
      return $('div#Signin').hide();
    };

    IndexViewController.prototype.showConnecting = function() {
      this.hideAll();
      return $('div#connecting').fadeIn();
    };

    IndexViewController.prototype.SignIn = function() {
      return this.SigninAuth();
    };

    return IndexViewController;

  })();

  $(function() {
    return new IndexViewController;
  });

}).call(this);
