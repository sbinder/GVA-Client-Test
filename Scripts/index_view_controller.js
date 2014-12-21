(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.IndexViewController = (function() {
    IndexViewController.prototype.API = 'http://localhost:54870/';

    IndexViewController.prototype.XID = null;

    function IndexViewController() {
      this.SigninAuth = __bind(this.SigninAuth, this);
      this.initialAuth = __bind(this.initialAuth, this);
      this.hideAll();
      $('#signinForm input[type="submit"]').click((function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.SignIn();
        };
      })(this));
      this.XID = CookieJar.read('xid');
      if ((this.XID != null) && this.XID !== '') {
        this.initialAuth();
      } else {
        window.location.replace('register.html');
      }
    }

    IndexViewController.prototype.initialAuth = function() {
      if ((this.XID == null) || this.XID === '') {
        return;
      }
      this.showConnecting();
      return $.ajax({
        type: 'GET',
        url: this.API + 'api/initial/' + this.XID,
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
      if ((this.XID == null) || this.XID === '') {
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
      var d;
      d = $.parseJSON(data);
      CookieJar.write('xid', d.xid);
      CookieJar.write('oid', d.oid);
      return window.location.replace('tx.html');

      /* store info
      
       * TEST ONLY
      $('#keyhole').html(data)
       * TEST
      
      @hideAll()
       *d = $.parseJSON(data)      
      $('#TXCenter').fadeIn()
      $('#ActTel').focus()
       */
    };

    IndexViewController.prototype.gotInit = function(data) {
      var d;
      $('#keyhole').html(data);
      this.hideAll();
      d = $.parseJSON(data);
      if (d.Key === 0) {
        window.location.replace('register.html');
        return;
      }
      if (d.Key === 1) {
        $('input#username').val("Demonstration").attr("readonly", "readonly");
        $('input#password').val("Demonstration").attr("readonly", "readonly");
      }
      if (d.Key === 1 || d.Key.length > 12) {
        $('#XID').val(d.Key);
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
